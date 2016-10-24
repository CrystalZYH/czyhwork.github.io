(function(Y){function B(o){var p=Y(o);p.addClass("tree");return p}function L(o){var p=Y.data(o,"tree").options;Y(o).unbind().bind("mouseover",function(q){var s=Y(q.target);var r=s.closest("div.tree-node");if(!r.length){return}r.addClass("tree-node-hover");if(s.hasClass("tree-hit")){if(s.hasClass("tree-expanded")){s.addClass("tree-expanded-hover")}else{s.addClass("tree-collapsed-hover")}}q.stopPropagation()}).bind("mouseout",function(q){var r=Y(q.target);var s=r.closest("div.tree-node");if(!s.length){return}s.removeClass("tree-node-hover");if(r.hasClass("tree-hit")){if(r.hasClass("tree-expanded")){r.removeClass("tree-expanded-hover")}else{r.removeClass("tree-collapsed-hover")}}q.stopPropagation()}).bind("click",function(q){var s=Y(q.target);var r=s.closest("div.tree-node");if(!r.length){return}if(s.hasClass("tree-hit")){D(o,r[0]);return false}else{if(s.hasClass("tree-checkbox")){d(o,r[0],!s.hasClass("tree-checkbox1"));return false}else{l(o,r[0]);p.onClick.call(o,G(o,r[0]))}}q.stopPropagation()}).bind("dblclick",function(r){var q=Y(r.target).closest("div.tree-node");if(!q.length){return}l(o,q[0]);p.onDblClick.call(o,G(o,q[0]));r.stopPropagation()}).bind("contextmenu",function(q){var r=Y(q.target).closest("div.tree-node");if(!r.length){return}p.onContextMenu.call(o,q,G(o,r[0]));q.stopPropagation()})}function i(q){var p=Y.data(q,"tree").options;p.dnd=false;var o=Y(q).find("div.tree-node");o.draggable("disable");o.css("cursor","pointer")}function E(r){var q=Y.data(r,"tree");var u=q.options;var t=q.tree;q.disabledNodes=[];u.dnd=true;t.find("div.tree-node").draggable({disabled:false,revert:true,cursor:"pointer",proxy:function(v){var w=Y('<div class="tree-node-proxy"></div>').appendTo("body");w.html('<span class="tree-dnd-icon tree-dnd-no">&nbsp;</span>'+Y(v).find(".tree-title").html());w.hide();return w},deltaX:15,deltaY:15,onBeforeDrag:function(v){if(u.onBeforeDrag.call(r,G(r,this))==false){return false}if(Y(v.target).hasClass("tree-hit")||Y(v.target).hasClass("tree-checkbox")){return false}if(v.which!=1){return false}Y(this).next("ul").find("div.tree-node").droppable({accept:"no-accept"});var w=Y(this).find("span.tree-indent");if(w.length){v.data.offsetWidth-=w.length*w.width()}},onStartDrag:function(){Y(this).draggable("proxy").css({left:-10000,top:-10000});u.onStartDrag.call(r,G(r,this));var v=G(r,this);if(v.id==undefined){v.id="easyui_tree_node_id_temp";H(r,v)}q.draggingNodeId=v.id},onDrag:function(x){var z=x.pageX,Aa=x.pageY,v=x.data.startX,w=x.data.startY;var y=Math.sqrt((z-v)*(z-v)+(Aa-w)*(Aa-w));if(y>3){Y(this).draggable("proxy").show()}this.pageY=x.pageY},onStopDrag:function(){Y(this).next("ul").find("div.tree-node").droppable({accept:"div.tree-node"});for(var v=0;v<q.disabledNodes.length;v++){Y(q.disabledNodes[v]).droppable("enable")}q.disabledNodes=[];var w=P(r,q.draggingNodeId);if(w&&w.id=="easyui_tree_node_id_temp"){w.id="";H(r,w)}u.onStopDrag.call(r,w)}}).droppable({accept:"div.tree-node",onDragEnter:function(v,w){if(u.onDragEnter.call(r,this,G(r,w))==false){p(w,false);Y(this).removeClass("tree-node-append tree-node-top tree-node-bottom");Y(this).droppable("disable");q.disabledNodes.push(this)}},onDragOver:function(x,v){if(Y(this).droppable("options").disabled){return}var z=v.pageY;var y=Y(this).offset().top;var w=y+Y(this).outerHeight();p(v,true);Y(this).removeClass("tree-node-append tree-node-top tree-node-bottom");if(z>y+(w-y)/2){if(w-z<5){Y(this).addClass("tree-node-bottom")}else{Y(this).addClass("tree-node-append")}}else{if(z-y<5){Y(this).addClass("tree-node-top")}else{Y(this).addClass("tree-node-append")}}if(u.onDragOver.call(r,this,G(r,v))==false){p(v,false);Y(this).removeClass("tree-node-append tree-node-top tree-node-bottom");Y(this).droppable("disable");q.disabledNodes.push(this)}},onDragLeave:function(v,w){p(w,false);Y(this).removeClass("tree-node-append tree-node-top tree-node-bottom");u.onDragLeave.call(r,this,G(r,w))},onDrop:function(v,x){var w=this;var z,y;if(Y(this).hasClass("tree-node-append")){z=s;y="append"}else{z=o;y=Y(this).hasClass("tree-node-top")?"top":"bottom"}if(u.onBeforeDrop.call(r,w,M(r,x),y)==false){Y(this).removeClass("tree-node-append tree-node-top tree-node-bottom");return}z(x,w,y);Y(this).removeClass("tree-node-append tree-node-top tree-node-bottom")}});function p(x,w){var v=Y(x).draggable("proxy").find("span.tree-dnd-icon");v.removeClass("tree-dnd-yes tree-dnd-no").addClass(w?"tree-dnd-yes":"tree-dnd-no")}function s(v,x){if(G(r,x).state=="closed"){a(r,x,function(){w()})}else{w()}function w(){var y=Y(r).tree("pop",v);Y(r).tree("append",{parent:x,data:[y]});u.onDrop.call(r,x,y,"append")}}function o(z,y,v){var x={};if(v=="top"){x.before=y}else{x.after=y}var w=Y(r).tree("pop",z);x.data=w;Y(r).tree("insert",x);u.onDrop.call(r,y,w,v)}}function d(v,r,q){var t=Y.data(v,"tree").options;if(!t.checkbox){return}var s=G(v,r);if(t.onBeforeCheck.call(v,s,q)==false){return}var o=Y(r);var u=o.find(".tree-checkbox");u.removeClass("tree-checkbox0 tree-checkbox1 tree-checkbox2");if(q){u.addClass("tree-checkbox1")}else{u.addClass("tree-checkbox0")}if(t.cascadeCheck){w(o);p(o)}t.onCheck.call(v,s,q);function p(y){var x=y.next().find(".tree-checkbox");x.removeClass("tree-checkbox0 tree-checkbox1 tree-checkbox2");if(y.find(".tree-checkbox").hasClass("tree-checkbox1")){x.addClass("tree-checkbox1")}else{x.addClass("tree-checkbox0")}}function w(x){var Ab=Q(v,x[0]);if(Ab){var Aa=Y(Ab.target).find(".tree-checkbox");Aa.removeClass("tree-checkbox0 tree-checkbox1 tree-checkbox2");if(z(x)){Aa.addClass("tree-checkbox1")}else{if(y(x)){Aa.addClass("tree-checkbox0")}else{Aa.addClass("tree-checkbox2")}}w(Y(Ab.target))}function z(Ac){var Ad=Ac.find(".tree-checkbox");if(Ad.hasClass("tree-checkbox0")||Ad.hasClass("tree-checkbox2")){return false}var Ae=true;Ac.parent().siblings().each(function(){if(!Y(this).children("div.tree-node").children(".tree-checkbox").hasClass("tree-checkbox1")){Ae=false}});return Ae}function y(Ac){var Ad=Ac.find(".tree-checkbox");if(Ad.hasClass("tree-checkbox1")||Ad.hasClass("tree-checkbox2")){return false}var Ae=true;Ac.parent().siblings().each(function(){if(!Y(this).children("div.tree-node").children(".tree-checkbox").hasClass("tree-checkbox0")){Ae=false}});return Ae}}}function R(u,o){var q=Y.data(u,"tree").options;if(!q.checkbox){return}var p=Y(o);if(S(u,o)){var t=p.find(".tree-checkbox");if(t.length){if(t.hasClass("tree-checkbox1")){d(u,o,true)}else{d(u,o,false)}}else{if(q.onlyLeafCheck){Y('<span class="tree-checkbox tree-checkbox0"></span>').insertBefore(p.find(".tree-title"))}}}else{var t=p.find(".tree-checkbox");if(q.onlyLeafCheck){t.remove()}else{if(t.hasClass("tree-checkbox1")){d(u,o,true)}else{if(t.hasClass("tree-checkbox2")){var r=true;var w=true;var v=Z(u,o);for(var s=0;s<v.length;s++){if(v[s].checked){w=false}else{r=false}}if(r){d(u,o,true)}if(w){d(u,o,false)}}}}}}function c(o,w,y,x){var z=Y.data(o,"tree");var t=z.options;var s=Y(w).prevAll("div.tree-node:first");y=t.loadFilter.call(o,y,s[0]);var u=J(o,"domId",s.attr("id"));if(!x){u?u.children=y:z.data=y;Y(w).empty()}else{if(u){u.children?u.children=u.children.concat(y):u.children=y}else{z.data=z.data.concat(y)}}t.view.render.call(t.view,o,w,y);if(t.dnd){E(o)}if(u){H(o,u)}var p=[];var r=[];for(var v=0;v<y.length;v++){var q=y[v];if(!q.checked){p.push(q)}}N(y,function(Aa){if(Aa.checked){r.push(Aa)}});if(p.length){d(o,Y("#"+p[0].domId)[0],false)}for(var v=0;v<r.length;v++){d(o,Y("#"+r[v].domId)[0],true)}setTimeout(function(){V(o,o)},0);t.onLoadSuccess.call(o,u,y)}function V(o,u,v){var p=Y.data(o,"tree").options;if(p.lines){Y(o).addClass("tree-lines")}else{Y(o).removeClass("tree-lines");return}if(!v){v=true;Y(o).find("span.tree-indent").removeClass("tree-line tree-join tree-joinbottom");Y(o).find("div.tree-node").removeClass("tree-node-last tree-root-first tree-root-one");var t=Y(o).tree("getRoots");if(t.length>1){Y(t[0].target).addClass("tree-root-first")}else{if(t.length==1){Y(t[0].target).addClass("tree-root-one")}}}Y(u).children("li").each(function(){var x=Y(this).children("div.tree-node");var w=x.next("ul");if(w.length){if(Y(this).next().length){r(x)}V(o,w,v)}else{q(x)}});var s=Y(u).children("li:last").children("div.tree-node").addClass("tree-node-last");s.children("span.tree-join").removeClass("tree-join").addClass("tree-joinbottom");function q(x,w){var y=x.find("span.tree-icon");y.prev("span.tree-indent").addClass("tree-join")}function r(x){var w=x.find("span.tree-indent, span.tree-hit").length;x.next().find("div.tree-node").each(function(){Y(this).children("span:eq("+(w-1)+")").addClass("tree-line")})}}function C(s,t,o,q){var p=Y.data(s,"tree").options;o=o||{};var v=null;if(s!=t){var u=Y(t).prev();v=G(s,u[0])}if(p.onBeforeLoad.call(s,v,o)==false){return}var w=Y(t).prev().children("span.tree-folder");w.addClass("tree-loading");var r=p.loader.call(s,o,function(x){w.removeClass("tree-loading");c(s,t,x);if(q){q()}},function(){w.removeClass("tree-loading");p.onLoadError.apply(s,arguments);if(q){q()}});if(r==false){w.removeClass("tree-loading")}}function a(s,p,t){var r=Y.data(s,"tree").options;var o=Y(p).children("span.tree-hit");if(o.length==0){return}if(o.hasClass("tree-expanded")){return}var q=G(s,p);if(r.onBeforeExpand.call(s,q)==false){return}o.removeClass("tree-collapsed tree-collapsed-hover").addClass("tree-expanded");o.next().addClass("tree-folder-open");var v=Y(p).next();if(v.length){if(r.animate){v.slideDown("normal",function(){q.state="open";r.onExpand.call(s,q);if(t){t()}})}else{v.css("display","block");q.state="open";r.onExpand.call(s,q);if(t){t()}}}else{var u=Y('<ul style="display:none"></ul>').insertAfter(p);C(s,u[0],{id:q.id},function(){if(u.is(":empty")){u.remove()}if(r.animate){u.slideDown("normal",function(){q.state="open";r.onExpand.call(s,q);if(t){t()}})}else{u.css("display","block");q.state="open";r.onExpand.call(s,q);if(t){t()}}})}}function m(o,q){var p=Y.data(o,"tree").options;var r=Y(q).children("span.tree-hit");if(r.length==0){return}if(r.hasClass("tree-collapsed")){return}var t=G(o,q);if(p.onBeforeCollapse.call(o,t)==false){return}r.removeClass("tree-expanded tree-expanded-hover").addClass("tree-collapsed");r.next().removeClass("tree-folder-open");var s=Y(q).next();if(p.animate){s.slideUp("normal",function(){t.state="closed";p.onCollapse.call(o,t)})}else{s.css("display","none");t.state="closed";p.onCollapse.call(o,t)}}function D(p,o){var q=Y(o).children("span.tree-hit");if(q.length==0){return}if(q.hasClass("tree-expanded")){m(p,o)}else{a(p,o)}}function K(p,o){var r=Z(p,o);if(o){r.unshift(G(p,o))}for(var q=0;q<r.length;q++){a(p,r[q].target)}}function I(t,s){var q=[];var r=Q(t,s);while(r){q.unshift(r);r=Q(t,r.target)}for(var o=0;o<q.length;o++){a(t,q[o].target)}}function X(t,s){var r=Y(t).parent();while(r[0].tagName!="BODY"&&r.css("overflow-y")!="auto"){r=r.parent()}var o=Y(s);var q=o.offset().top;if(r[0].tagName!="BODY"){var p=r.offset().top;if(q<p){r.scrollTop(r.scrollTop()+q-p)}else{if(q+o.outerHeight()>p+r.outerHeight()-18){r.scrollTop(r.scrollTop()+q+o.outerHeight()-p-r.outerHeight()+18)}}}else{r.scrollTop(q)}}function W(q,p){var r=Z(q,p);if(p){r.unshift(G(q,p))}for(var o=0;o<r.length;o++){m(q,r[o].target)}}function g(o,u){var q=Y(u.parent);var p=u.data;if(!p){return}p=Y.isArray(p)?p:[p];if(!p.length){return}var s;if(q.length==0){s=Y(o)}else{if(S(o,q[0])){var t=q.find("span.tree-icon");t.removeClass("tree-file").addClass("tree-folder tree-folder-open");var r=Y('<span class="tree-hit tree-expanded"></span>').insertBefore(t);if(r.prev().length){r.prev().remove()}}s=q.next();if(!s.length){s=Y("<ul></ul>").insertAfter(q)}}c(o,s[0],p,true);R(o,s.prev())}function j(o,r){var s=r.before||r.after;var q=Q(o,s);var u=r.data;if(!u){return}u=Y.isArray(u)?u:[u];if(!u.length){return}g(o,{parent:(q?q.target:null),data:u});var t=Y();for(var p=0;p<u.length;p++){t=t.add(Y("#"+u[p].domId).parent())}if(r.before){t.insertBefore(Y(s).parent())}else{t.insertAfter(Y(s).parent())}}function A(s,p){var o=r(p);Y(p).parent().remove();if(o){if(!o.children||!o.children.length){var q=Y(o.target);q.find(".tree-icon").removeClass("tree-folder").addClass("tree-file");q.find(".tree-hit").remove();Y('<span class="tree-indent"></span>').prependTo(q);q.next().remove()}H(s,o);R(s,o.target)}V(s,s);function r(u){var x=Y(u).attr("id");var w=Q(s,u);var v=w?w.children:Y.data(s,"tree").data;for(var t=0;t<v.length;t++){if(v[t].domId==x){v.splice(t,1);break}}return w}}function H(q,t){var s=Y.data(q,"tree").options;var p=Y(t.target);var r=G(q,t.target);var o=r.checked;if(r.iconCls){p.find(".tree-icon").removeClass(r.iconCls)}Y.extend(r,t);p.find(".tree-title").html(s.formatter.call(q,r));if(r.iconCls){p.find(".tree-icon").addClass(r.iconCls)}if(o!=r.checked){d(q,t.target,r.checked)}}function n(p){var o=k(p);return o.length?o[0]:null}function k(q){var p=Y.data(q,"tree").data;for(var o=0;o<p.length;o++){T(p[o])}return p}function Z(r,q){var o=[];var p=G(r,q);var s=p?p.children:Y.data(r,"tree").data;N(s,function(t){o.push(T(t))});return o}function Q(o,r){var q=Y(r).closest("ul").prevAll("div.tree-node:first");return G(o,q[0])}function U(o,r){r=r||"checked";if(!Y.isArray(r)){r=[r]}var q=[];for(var p=0;p<r.length;p++){var t=r[p];if(t=="checked"){q.push("span.tree-checkbox1")}else{if(t=="unchecked"){q.push("span.tree-checkbox0")}else{if(t=="indeterminate"){q.push("span.tree-checkbox2")}}}}var u=[];Y(o).find(q.join(",")).each(function(){var s=Y(this).parent();u.push(G(o,s[0]))});return u}function b(p){var o=Y(p).find("div.tree-node-selected");return o.length?G(p,o[0]):null}function M(q,p){var o=G(q,p);if(o&&o.children){N(o.children,function(r){T(r)})}return o}function G(o,p){return J(o,"domId",Y(p).attr("id"))}function P(o,p){return J(o,"id",p)}function J(q,p,s){var r=Y.data(q,"tree").data;var o=null;N(r,function(t){if(t[p]==s){o=T(t);return false}});return o}function T(p){var o=Y("#"+p.domId);p.target=o[0];p.checked=o.find(".tree-checkbox").hasClass("tree-checkbox1");return p}function N(o,s){var r=[];for(var p=0;p<o.length;p++){r.push(o[p])}while(r.length){var q=r.shift();if(s(q)==false){return}if(q.children){for(var p=q.children.length-1;p>=0;p--){r.unshift(q.children[p])}}}}function l(r,q){var p=Y.data(r,"tree").options;var o=G(r,q);if(p.onBeforeSelect.call(r,o)==false){return}Y(r).find("div.tree-node-selected").removeClass("tree-node-selected");Y(q).addClass("tree-node-selected");p.onSelect.call(r,o)}function S(p,o){return Y(o).children("span.tree-hit").length==0}function F(p,r){var o=Y.data(p,"tree").options;var u=G(p,r);if(o.onBeforeEdit.call(p,u)==false){return}Y(r).css("position","relative");var q=Y(r).find(".tree-title");var t=q.outerWidth();q.empty();var s=Y('<input class="tree-editor">').appendTo(q);s.val(u.text).focus();s.width(t+20);s.height(document.compatMode=="CSS1Compat"?(18-(s.outerHeight()-s.height())):18);s.bind("click",function(v){return false}).bind("mousedown",function(v){v.stopPropagation()}).bind("mousemove",function(v){v.stopPropagation()}).bind("keydown",function(v){if(v.keyCode==13){f(p,r);return false}else{if(v.keyCode==27){h(p,r);return false}}}).bind("blur",function(v){v.stopPropagation();f(p,r)})}function f(q,t){var s=Y.data(q,"tree").options;Y(t).css("position","");var p=Y(t).find("input.tree-editor");var o=p.val();p.remove();var r=G(q,t);r.text=o;H(q,r);s.onAfterEdit.call(q,r)}function h(r,q){var p=Y.data(r,"tree").options;Y(q).css("position","");Y(q).find("input.tree-editor").remove();var o=G(r,q);H(r,o);p.onCancelEdit.call(r,o)}Y.fn.tree=function(p,o){if(typeof p=="string"){return Y.fn.tree.methods[p](this,o)}var p=p||{};return this.each(function(){var q=Y.data(this,"tree");var s;if(q){s=Y.extend(q.options,p);q.options=s}else{s=Y.extend({},Y.fn.tree.defaults,Y.fn.tree.parseOptions(this),p);Y.data(this,"tree",{options:s,tree:B(this),data:[]});var r=Y.fn.tree.parseData(this);if(r.length){c(this,this,r)}}L(this);if(s.data){c(this,this,s.data)}C(this,this)})};Y.fn.tree.methods={options:function(o){return Y.data(o[0],"tree").options},loadData:function(o,p){return o.each(function(){c(this,this,p)})},getNode:function(o,p){return G(o[0],p)},getData:function(o,p){return M(o[0],p)},reload:function(p,o){return p.each(function(){if(o){var q=Y(o);var r=q.children("span.tree-hit");r.removeClass("tree-expanded tree-expanded-hover").addClass("tree-collapsed");q.next().remove();a(this,o)}else{Y(this).empty();C(this,this)}})},getRoot:function(o){return n(o[0])},getRoots:function(o){return k(o[0])},getParent:function(o,p){return Q(o[0],p)},getChildren:function(o,p){return Z(o[0],p)},getChecked:function(o,p){return U(o[0],p)},getSelected:function(o){return b(o[0])},isLeaf:function(o,p){return S(o[0],p)},find:function(o,p){return P(o[0],p)},select:function(o,p){return o.each(function(){l(this,p)})},check:function(o,p){return o.each(function(){d(this,p,true)})},uncheck:function(o,p){return o.each(function(){d(this,p,false)})},collapse:function(o,p){return o.each(function(){m(this,p)})},expand:function(o,p){return o.each(function(){a(this,p)})},collapseAll:function(o,p){return o.each(function(){W(this,p)})},expandAll:function(o,p){return o.each(function(){K(this,p)})},expandTo:function(o,p){return o.each(function(){I(this,p)})},scrollTo:function(p,o){return p.each(function(){X(this,o)})},toggle:function(o,p){return o.each(function(){D(this,p)})},append:function(o,p){return o.each(function(){g(this,p)})},insert:function(o,p){return o.each(function(){j(this,p)})},remove:function(o,p){return o.each(function(){A(this,p)})},pop:function(o,q){var p=o.tree("getData",q);o.tree("remove",q);return p},update:function(o,p){return o.each(function(){H(this,p)})},enableDnd:function(o){return o.each(function(){E(this)})},disableDnd:function(o){return o.each(function(){i(this)})},beginEdit:function(o,p){return o.each(function(){F(this,p)})},endEdit:function(o,p){return o.each(function(){f(this,p)})},cancelEdit:function(o,p){return o.each(function(){h(this,p)})}};Y.fn.tree.parseOptions=function(o){var p=Y(o);return Y.extend({},Y.parser.parseOptions(o,["url","method",{checkbox:"boolean",cascadeCheck:"boolean",onlyLeafCheck:"boolean"},{animate:"boolean",lines:"boolean",dnd:"boolean"}]))};Y.fn.tree.parseData=function(p){var q=[];o(q,Y(p));return q;function o(s,r){r.children("li").each(function(){var t=Y(this);var u=Y.extend({},Y.parser.parseOptions(this,["id","iconCls","state"]),{checked:(t.attr("checked")?true:undefined)});u.text=t.children("span").html();if(!u.text){u.text=t.html()}var v=t.children("ul");if(v.length){u.children=[];o(u.children,v)}s.push(u)})}};var O=1;var e={render:function(u,q,p){var o=Y.data(u,"tree").options;var s=Y(q).prev("div.tree-node").find("span.tree-indent, span.tree-hit").length;var r=t(s,p);Y(q).append(r.join(""));function t(y,x){var Aa=[];for(var w=0;w<x.length;w++){var z=x[w];if(z.state!="open"&&z.state!="closed"){z.state="open"}z.domId="_easyui_tree_"+O++;Aa.push("<li>");Aa.push('<div id="'+z.domId+'" class="tree-node">');for(var Ab=0;Ab<y;Ab++){Aa.push('<span class="tree-indent"></span>')}if(z.state=="closed"){Aa.push('<span class="tree-hit tree-collapsed"></span>');Aa.push('<span class="tree-icon tree-folder '+(z.iconCls?z.iconCls:"")+'"></span>')}else{if(z.children&&z.children.length){Aa.push('<span class="tree-hit tree-expanded"></span>');Aa.push('<span class="tree-icon tree-folder tree-folder-open '+(z.iconCls?z.iconCls:"")+'"></span>')}else{Aa.push('<span class="tree-indent"></span>');Aa.push('<span class="tree-icon tree-file '+(z.iconCls?z.iconCls:"")+'"></span>')}}if(o.checkbox){if((!o.onlyLeafCheck)||(o.onlyLeafCheck&&(!z.children||!z.children.length))){Aa.push('<span class="tree-checkbox tree-checkbox0"></span>')}}Aa.push('<span class="tree-title">'+o.formatter.call(u,z)+"</span>");Aa.push("</div>");if(z.children&&z.children.length){var v=t(y+1,z.children);Aa.push('<ul style="display:'+(z.state=="closed"?"none":"block")+'">');Aa=Aa.concat(v);Aa.push("</ul>")}Aa.push("</li>")}return Aa}}};Y.fn.tree.defaults={url:null,method:"post",animate:false,checkbox:false,cascadeCheck:true,onlyLeafCheck:false,lines:false,dnd:false,data:null,formatter:function(o){return o.text},loader:function(r,q,o){var p=Y(this).tree("options");if(!p.url){return false}Y.ajax({type:p.method,url:p.url,data:r,dataType:"json",success:function(s){q(s)},error:function(){o.apply(this,arguments)}})},loadFilter:function(p,o){return p},view:e,onBeforeLoad:function(o,p){},onLoadSuccess:function(o,p){},onLoadError:function(){},onClick:function(o){},onDblClick:function(o){},onBeforeExpand:function(o){},onExpand:function(o){},onBeforeCollapse:function(o){},onCollapse:function(o){},onBeforeCheck:function(o,p){},onCheck:function(o,p){},onBeforeSelect:function(o){},onSelect:function(o){},onContextMenu:function(o,p){},onBeforeDrag:function(o){},onStartDrag:function(o){},onStopDrag:function(o){},onDragEnter:function(p,o){},onDragOver:function(p,o){},onDragLeave:function(p,o){},onBeforeDrop:function(q,p,o){},onDrop:function(q,p,o){},onBeforeEdit:function(o){},onAfterEdit:function(o){},onCancelEdit:function(o){}}})(jQuery);