import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { runInNewContext } from 'node:vm'

test('browser bundle activates and registers native main, sidebar and retained settings', async () => {
  const pkg = JSON.parse(readFileSync(new URL('../package.json', import.meta.url),'utf8'))
  let definition, client, active='en'
  const react={createElement:(type,props,...children)=>({type,props,children}),useEffect(){}}
  runInNewContext(readFileSync(new URL('../lib/client.js',import.meta.url),'utf8'),{
    URL, AbortController, setTimeout, clearTimeout, document:{baseURI:'http://dsh.test/'}, fetch:async()=>({ok:true,json:async()=>({hideWorkbench:false})}),
    window:{__ModuleLoader__:{load(entry){definition=entry;client=entry.factory(name=>{
      if(name==='react')return react
      throw new Error('Unexpected eager UI dependency: '+name)
    })}}}
  })
  assert.equal(definition.id,pkg.name)
  const registrations=[]
  const locale={getSnapshot:()=>({active})}
  client.apply({locale,get:()=>locale,effect(fn,label){if(label?.endsWith(': locale')||label?.endsWith('workbench visibility'))return fn()},slots:{inject(_name,fn){fn()},register(meta,component){registrations.push({meta,component});return ()=>{}}}})
  await new Promise(resolve=>setImmediate(resolve))
  const main=registrations.find(row=>row.meta.name==='main')
  const sidebar=registrations.find(row=>row.meta.name==='sidebar.panellist')
  const settings=registrations.find(row=>row.meta.name==='settings.section')
  assert.ok(main);assert.ok(sidebar);assert.ok(settings)
  assert.equal(main.meta.key,sidebar.meta.id)
  assert.equal(main.meta.inject().workbench,true)
  assert.equal(typeof main.component,'function')
  assert.equal(typeof settings.component,'function')
  const en=sidebar.meta.label();assert.ok(en);assert.doesNotMatch(en,/[\u3400-\u9fff]/)
  active='zh';assert.ok(sidebar.meta.label())
})

test('hiding the workbench keeps model tools, library routes and retained Settings', async () => {
  const {apply,resolveConfig}=await import('../lib/index.js');
  assert.equal(resolveConfig({}).hideWorkbench,false);assert.equal(resolveConfig({hideWorkbench:true}).hideWorkbench,true);
  assert.throws(()=>resolveConfig({hideWorkbench:'true'}),/hideWorkbench/);
  const tools=[],routes=[],disposers=[];
  apply({tools:{register(def){tools.push(def);return()=>{}}},inject(names,callback){if(names.length===1&&names[0]==='connection')callback({connection:{fetch:{register(route){routes.push(route);return()=>{}}}}})},on(event,fn){if(event==='dispose')disposers.push(fn)}},{hideWorkbench:true});
  try {
    assert.ok(tools.some(tool=>tool.name==='cite_lookup'));assert.ok(tools.some(tool=>tool.name==='cite_batch'));
    const preference=routes.find(route=>route.path==='/api/dsh-cite/preferences');
    assert.deepEqual(await (await preference.fetch()).json(),{hideWorkbench:true});
    assert.ok(routes.some(route=>route.path==='/api/dsh-cite/library'));
  }finally{for(const dispose of disposers)dispose()}
  let client; const registrations=[];
  runInNewContext(readFileSync(new URL('../lib/client.js',import.meta.url),'utf8'),{
    URL,AbortController,setTimeout,clearTimeout,document:{baseURI:'http://dsh.test/'},fetch:async()=>({ok:true,json:async()=>({hideWorkbench:true})}),
    window:{__ModuleLoader__:{load(entry){client=entry.factory(()=>({createElement(){},useEffect(){}}))}}}
  });
  client.apply({effect(fn,label){if(label==='dsh-cite: workbench visibility')return fn()},slots:{inject(_name,callback){callback()},register(meta){registrations.push(meta);return()=>{}}}});
  await new Promise(resolve=>setImmediate(resolve));
  assert.ok(registrations.some(row=>row.name==='settings.section'));
  assert.equal(registrations.some(row=>row.name==='main'||row.name==='sidebar.panellist'),false);
});
