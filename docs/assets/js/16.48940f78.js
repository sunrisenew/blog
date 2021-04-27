(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{209:function(s,a,t){"use strict";t.r(a);var e=t(2),n=Object(e.a)({},(function(){var s=this,a=s.$createElement,t=s._self._c||a;return t("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[t("h1",{attrs:{id:"根据指定的行数拆分csv文件"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#根据指定的行数拆分csv文件"}},[s._v("#")]),s._v(" 根据指定的行数拆分CSV文件")]),s._v(" "),t("p",[s._v("CSV文件以纯文本形式存储表格数据。不同于Excel文件复杂的内容格式，纯文本文件可以非常方便地使用Shell命令处理。")]),s._v(" "),t("p",[s._v("在最近的工作中遇到一个问题：客户导出的用户数据有60w条之多，全部保存在一个CSV文件中。要导入系统中遇到了几个问题：")]),s._v(" "),t("ol",[t("li",[s._v("由于考虑不周，在导入用户的脚本中没有按行读取CSV文件，而是一次性全部加载到内存中循环处理。在这样的情况下就必须要考虑大数据量导入时内存溢出的问题。")]),s._v(" "),t("li",[s._v("每导入一个用户系统都要做触发相关事件等额外操作。这就导致如果是一个文件从头到尾导入，速度会非常慢，时间过长无法接受。期望可以使用多个文件并行导入。")]),s._v(" "),t("li",[s._v("期望在导入过程中某一条数据出错导致脚本崩溃时，可以尽可能小范围排查数据，也要尽可能减少重试时检查已导入的数据。")])]),s._v(" "),t("p",[s._v("综合考虑，我们需要把这个巨大的CSV拆分为小文件，每个文件2w行且第一行保留表头。")]),s._v(" "),t("h2",{attrs:{id:"使用split命令拆分文件"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#使用split命令拆分文件"}},[s._v("#")]),s._v(" 使用"),t("code",[s._v("split")]),s._v("命令拆分文件")]),s._v(" "),t("p",[t("code",[s._v("split")]),s._v("命令可以将一个大文件按文件大小或行数拆分为多个小文件。")]),s._v(" "),t("ol",[t("li",[s._v("新建一个"),t("code",[s._v("splitCsv.sh")]),s._v("文件，粘贴下面的代码后保存。")])]),s._v(" "),t("div",{staticClass:"language-sh line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-sh"}},[t("code",[t("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("HEADER")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),t("span",{pre:!0,attrs:{class:"token variable"}},[t("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$(")]),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("head")]),s._v(" -1 $1"),t("span",{pre:!0,attrs:{class:"token variable"}},[s._v(")")])]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("if")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v(" -n "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"'),t("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$2")]),s._v('"')]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("then")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("CHUNK")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),t("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$2")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("else")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("CHUNK")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("1000")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("fi")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("tail")]),s._v(" -n +2 "),t("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$1")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("split")]),s._v(" -l "),t("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$CHUNK")]),s._v(" - "),t("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$1_split_")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("for")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token for-or-select variable"}},[s._v("i")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("in")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$1_split_")]),s._v("*"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("do")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("sed")]),s._v(" -i -e "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"1i'),t("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$HEADER")]),s._v('"')]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"'),t("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$i")]),s._v('"')]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("done")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br"),t("span",{staticClass:"line-number"},[s._v("9")]),t("br"),t("span",{staticClass:"line-number"},[s._v("10")]),t("br")])]),t("ol",{attrs:{start:"2"}},[t("li",[s._v("给"),t("code",[s._v("splitCsv.sh")]),s._v("添加可执行权限。")])]),s._v(" "),t("div",{staticClass:"language-sh line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-sh"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("chmod")]),s._v(" u+x splitCsv.sh\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br")])]),t("ol",{attrs:{start:"3"}},[t("li",[s._v("拆分CSV文件。")])]),s._v(" "),t("div",{staticClass:"language-sh line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-sh"}},[t("code",[s._v("./splitCsv.sh User.csv "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("20000")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br")])]),t("h2",{attrs:{id:"为文件批量添加-csv后缀名"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#为文件批量添加-csv后缀名"}},[s._v("#")]),s._v(" 为文件批量添加"),t("code",[s._v(".csv")]),s._v("后缀名")]),s._v(" "),t("p",[s._v("使用"),t("code",[s._v("split")]),s._v("命令拆分文件后每个分片文件会被加上"),t("code",[s._v("aa")]),s._v("、"),t("code",[s._v("ab")]),s._v("、"),t("code",[s._v("ac")]),s._v("这样的序号后缀（也可以通过加上"),t("code",[s._v("-d")]),s._v("参数指定为数字后缀），如"),t("code",[s._v("User.csv_split_aa")]),s._v("。我们期望拆分出来的每个文件都有相同的"),t("code",[s._v(".csv")]),s._v("后缀。")]),s._v(" "),t("p",[s._v("执行下面的命令，为"),t("code",[s._v("User.csv_split_")]),s._v("开头的文件加上"),t("code",[s._v(".csv")]),s._v("后缀名。")]),s._v(" "),t("div",{staticClass:"language-sh line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-sh"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("ls")]),s._v(" User.csv_split_* "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("xargs")]),s._v(" -t -i "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("mv")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v(".csv\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br")])])])}),[],!1,null,null,null);a.default=n.exports}}]);