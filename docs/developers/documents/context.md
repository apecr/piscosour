---
title: context
name: context
type: plugins
layout: api_doc.html
---
# Plugins: context


### Context for the pisco execution

With this plugin you can automatically check where recipe was executed. This plugin take configuration from params and expose two method and make one pre-hook check.
 
#### How two configure repoType definitions

You can configure the repoTypes definition in all the configurations files where pisco recipes are configured [see information for pisco configuration](doc/Load_Parameters.md). 

**Is recommend to use the piscosour.json file of your recipe**

The param is called contexts, and must be a Hash with the name of the repoType as key and Array with all the rules the repo must to match.

example of piscosour.json:
```
    &quot;params&quot;: {
        &quot;contexts&quot;: {
            &quot;node-module&quot;: [
                {
                    &quot;file&quot;: &quot;package.json&quot;,
                    &quot;conditions&quot;: [
                        &quot;that.version&quot;
                    ]
                },
                {
                    &quot;file&quot;: &quot;piscosour.json&quot;,
                    &quot;noexists&quot;: &quot;true&quot;
                }
            ],
            &quot;recipe&quot;: [
                {
                    &quot;sufficient&quot;: true,
                    &quot;file&quot;: &quot;.piscosour/piscosour.json&quot;,
                    &quot;conditions&quot;: [
                        &quot;that.repoType===&#39;recipe&#39;&quot;
                    ]
                },
                {
                    &quot;file&quot;: &quot;package.json&quot;,
                    &quot;conditions&quot;: [
                        &quot;that.keywords.indexOf(&#39;piscosour-recipe&#39;)&gt;=0&quot;
                    ]
                },
                {
                    &quot;file&quot;: &quot;piscosour.json&quot;
                }
            ]
        }
    },
```

**Rules:**

Define all rules that a repoType must match. All rules not sufficient must to be satisfied.

- **file:** The path of the file relative to the root of the repoType. (for exemple: package.json for a node-module)
- **sufficient:** If this rule is matched the rest of the rules are ignored. If is not matched, the rule is ignored and the rest of rules are evaluated (default: false)
- **noexist:** Check if the file is **not** present. (default: false)
- **conditions:** Is an array with all the conditions that the file must to match. 
  1. The file must to be a correct json file.
  2. **that** is the instance of the json object.
  3. write one condition per element in your array. 
  4. The conditions were evaluated using javascript.

#### Pre-hook: Check one shot is executed in the root of any repository type.

By default, the shot behaviour is assume that repoType is mandatory, if you need to execute one shot without this check of context, use **contextFree** parameter. **contextFree** usually is used for shotd like &quot;create&quot; or something like that.  

only parametrized in params.json:

```
{
 [...]
  &quot;contextFree&quot; : true
}
```

A user command (straw) only could be contextFree if all of its shots are contextFree. If only one shot of a straw is not contextFree then the context will be checked.

**Disable this check using options in the command line**: Is possible to disable this check using this option in the command line: **--b-disableContextCheck**. Usefull for system requirements checks.

#### addon: this.ctxIs

| Param | Description |
| --- | --- |
| name | name of the repoType to test|


Use this.ctxIs to ask pisco where was executed.

```
let isComponent = this.ctxIs(&quot;component&quot;);
```

isComponent must to be true if your recipe was executed in the root of a component.

#### addon: this.ctxWhoami

Ask pisco the repoTypes of the directory where you executed your recipe.

```
let repos = this.ctxWhoami();
```

repos is an Array of types that match the place where your recipe was executed.

