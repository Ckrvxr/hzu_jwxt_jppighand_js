// ==UserScript==
// @name         惠州学院 HZU | 教务系统一键教评助手
// @namespace    hzu_jwxt_jppighand
// @version      1.0.0
// @author       Ckrvxr, 31415926535x
// @match        *://jwxt.hzu.edu.cn/xspjgl/xspj_cxXspjIndex.html
// @grant        none
// @license      Apache License 2.0
// ==/UserScript==

(function () {
    'use strict';

    // 等待页面加载完成
    window.addEventListener('load', function () {
        // 绑定点击事件到评价按钮
        document.getElementById("btn_yd").onclick = function () {
            setTimeout(initOneClickEvaluation, 2000);
        }
    });

    function initOneClickEvaluation() {
        console.log("初始化一键评价功能...");

        // 获取评价面板元素
        let panel_body1 = document.getElementsByClassName("panel panel-default")[1];
        let panel_body2 = document.getElementsByClassName("panel-body")[3];

        // 克隆评价模板并修改
        let blockquote = panel_body2.getElementsByTagName("blockquote")[0].cloneNode(true);
        blockquote.getElementsByTagName("p")[0].innerText = "一键评价";

        let table = panel_body2.getElementsByTagName("table")[0].cloneNode(true);
        table.removeAttribute("data-pjzbxm_id");
        table.removeAttribute("data-qzz");

        let tbody = table.getElementsByTagName("tbody")[0];
        let tr = tbody.getElementsByTagName("tr")[0];

        // 清理多余的行
        while (tbody.getElementsByTagName("tr").length > 1) {
            tbody.removeChild(tbody.getElementsByTagName("tr")[1]);
        }

        // 修改表行属性
        tr.removeAttribute("data-zsmbmcb_id");
        tr.removeAttribute("data-pjzbxm_id");
        tr.removeAttribute("data-pfdjdmb_id");
        tr.getElementsByTagName("td")[0].innerText = "选择的最高分:";

        // 修改评分选项
        let inputs = tr.getElementsByClassName("radio-pjf");
        for (let i = 0; i < 5; ++i) {
            inputs[i].removeAttribute("name");
            inputs[i].removeAttribute("data-pfdjdmxmb_id");
            inputs[i].setAttribute("name", "StudentEvalution");
        }
        inputs[0].setAttribute("checked", "checked");

        // 创建一键评价按钮
        let btn = document.createElement("button");
        btn.className = "btn btn-default";
        btn.style.marginLeft = "10px";

        let sp = document.createElement("span");
        sp.innerText = "一键评价";
        sp.className = "bigger-120 glyphicon glyphicon-ok";
        btn.append(sp);
        btn.setAttribute("id", "btn_StudentEvalution");

        btn.onclick = function () {
            // 获取选择的评分等级
            let score = 5;
            let checked = document.getElementsByName("StudentEvalution");
            for (let i = 0; i < checked.length; ++i) {
                if (checked[i].checked) {
                    score = checked[i].getAttribute("data-dyf");
                }
            }
            console.log("设置的最高分数为: " + score);

            // 转换为索引(5分=0,4分=1,...1分=4)
            score = 5 - score;

            // 获取所有评分项
            let inputs = document.getElementsByClassName("panel-body")[3].getElementsByTagName("input");

            // 随机选择少量项目设为次高分
            let flag = Math.round(Math.random() * (inputs.length / 5));
            console.log("随机项索引: " + flag);

            // 批量设置评分
            for (let i = score; i < inputs.length; i += 5) {
                if (Math.round(i / 5) == flag) {
                    inputs[i + 1].setAttribute("checked", "checked");
                } else {
                    inputs[i].setAttribute("checked", "checked");
                }
            }

            alert("一键评价完成！请检查评分结果后提交。");
        };

        // 将按钮添加到行中
        let td = document.createElement("td");
        td.appendChild(btn);
        tr.appendChild(td);

        // 将一键评价面板添加到页面
        panel_body1.prepend(table);
        panel_body1.prepend(blockquote);

        console.log("一键评价功能初始化完成");
    }
})();