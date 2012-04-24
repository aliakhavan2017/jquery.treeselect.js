(function(b){b.fn.treeselect=function(c){var c=b.extend({colwidth:18,selected:null,load:null,deepLoad:!1,selectAll:!1},c),e=function(a){a.title=a.title||"anonymous";b.extend(this,{id:0,value:0,title:"",has_children:!0,children:[],level:0,odd:!1,checked:!1,busy:!1,display:b(),input:b(),link:b(),span:b(),childlist:b()},a);this.isTreeNode=!0};e.prototype.setBusy=function(a){if(a!=this.busy)if(this.busy=a){a=b(document.createElement("div")).addClass("treebusy");a.text("loading...");var d=b("ul",this.display);
0==d.length?this.display.append(a):d.prepend(a)}else b("div.treebusy",this.display).remove()};e.prototype.isLoaded=function(){var a=!this.has_children;return a|=this.has_children&&0<this.children.length};e.prototype.loadNode=function(a){c.load&&!this.isLoaded()?(this.setBusy(!0),c.load(this,function(d){d.build();a&&a(d);d.setBusy(!1)})):a&&a(this)};e.prototype.loadAll=function(a){this.loadNode(function(d){var b=d.children.length,c=b;if(b)for(d.setBusy(!0);b--;)d.children[b].loadAll(function(){c--;
a&&!c&&(a(d),d.setBusy(!1))});else a(d)})};e.prototype.expand=function(a){this.checked=this.input.is(":checked");a?(this.link.removeClass("collapsed").addClass("expanded"),this.span.removeClass("collapsed").addClass("expanded"),this.childlist.show("fast")):0<this.span.length&&(this.link.removeClass("expanded").addClass("collapsed"),this.span.removeClass("expanded").addClass("collapsed"),this.childlist.hide("fast"));a&&!this.isLoaded()&&this.loadNode(function(a){a.checked&&a.select(a.checked);a.expand(true)})};
e.prototype.selectChildren=function(a){for(var b=this.children.length;b--;)this.children[b].select(a,!0)};e.prototype.select=function(a,b){this.checked=a;this.input.attr("checked",a);this.checked&&c.deepLoad?this.loadAll(function(e){e.selectChildren(a);c.selected&&c.selected(e,!b)}):(this.selectChildren(a),c.selected&&c.selected(this,!b))};e.prototype.build_list=function(){var a=b();this.id&&(a=b(document.createElement("li")),a.addClass(this.odd?"odd":"even"));return a};e.prototype.build_input=function(a){if(this.id||
c.selectAll)this.input=b(document.createElement("input")),this.input.attr({type:"checkbox",value:this.value||this.id,name:"treeselect-"+this.id,checked:this.checked}),this.input.css("left",a+"px"),this.input.bind("click",function(a){return function(c){c=b(c.target).is(":checked");a.expand(c);a.select(c)}}(this));return this.input};e.prototype.build_link=function(a){a.css("cursor","pointer").addClass("collapsed");a.bind("click",{node:this},function(a){a.preventDefault();a.data.node.expand(b(a.target).hasClass("collapsed"))});
return a};e.prototype.build_span=function(a){this.id&&this.has_children&&(this.span=this.build_link(b(document.createElement("span"))),this.span.css("left",a+"px"));return this.span};e.prototype.build_title=function(a){this.id&&this.title&&(this.link=this.build_link(b(document.createElement("a"))),this.link.css("marginLeft",a+"px").text(this.title));return this.link};e.prototype.build_children=function(){this.childlist=b();if(0<this.children.length){this.childlist=b(document.createElement("ul"));
var a=this.odd,d;for(d in this.children)this.children.hasOwnProperty(d)&&(a=!a,this.children[d]=new e(b.extend(this.children[d],{level:this.level+1,odd:a,checked:this.checked})),this.childlist.append(this.children[d].build()))}return this.childlist};e.prototype.build=function(){var a=0;0==this.display.length&&(this.display=this.build_list());0==this.input.length&&this.display.append(this.build_input(a));0==this.span.length&&(a+=c.colwidth,this.display.append(this.build_span(a)));0==this.link.length&&
(a+=c.colwidth,this.display.append(this.build_title(a)));0==this.childlist.length&&this.display.append(this.build_children());return this.display};return b(this).each(function(){var a=b.extend(c,{display:b(this)});(new e(a)).loadNode(function(a){a.checked&&a.select(a.checked);a.expand(!0)})})}})(jQuery);
(function(b){b.fn.chosentree=function(c){c=b.extend({inputId:"chosentree-select",width:450,title:"",description:"",default_text:"Select Item",loaded:null,collapsed:!0},c);return b(this).each(function(){function e(a){a?g.addClass("treevisible").show("fast"):g.removeClass("treevisible").hide("fast")}var a=null,d=null,k=null,f=null,h=null,i=null,g=f=null,a=b(document.createElement("div"));a.addClass("chzn-container chzn-container-multi");d=b(document.createElement("ul"));d.addClass("chzn-choices chosentree-choices");
k=b(document.createElement("li"));k.addClass("search-field");h=b(document.createElement("label"));h.attr({"for":c.inputId});h.text(c.title);i=b(document.createElement("div"));i.attr({"class":"description"});i.text(c.description);f=b(document.createElement("input"));f.attr({type:"text",name:c.inputId,id:c.inputId,value:c.default_text,"class":"default",autocomplete:"off"});f.css("width","100%");f.focus(function(){e(!0)});a.append(h).append(d.append(k.append(f)));g=b(document.createElement("div"));g.addClass("treewrapper");
g.css("width",c.width+"px");g.hide();f=b(document.createElement("div"));f.addClass("treeselect");b(this).keyup(function(a){27==a.which&&e(!1)});b(this).append(a.append(g.append(f)));b(this).append(i);var j=c;j.selected=function(a){return function(c,e){var f=b("li#choice_"+c.id,d);if(c.id)if(c.checked&&0==f.length){f=b(document.createElement("li"));f.addClass("search-choice");f.attr("id","choice_"+c.id);f.eq(0)[0].nodeData=c;var g=b(document.createElement("span"));g.text(c.title);var h=b(document.createElement("a"));
h.addClass("search-choice-close");h.attr("href","javascript:void(0)");h.bind("click",function(a){a.preventDefault();b("li#choice_"+c.id,d).remove();c.select(!1)});k.before(f.append(g).append(h))}else c.checked||f.remove();if(e){var i=[];a.value={};d.show();b("li.search-choice",d).each(function(){a.value[this.nodeData.id]=this.nodeData.value;i.push(this.nodeData)});jQuery.fn.moreorless&&d.moreorless(100,"+"+i.length+" more");j.loaded&&j.loaded(i);b(a).trigger("treeloaded")}}}(this);b(f).treeselect(j);
j.collapsed||(d.hide(),e(!0,null))})}})(jQuery);
