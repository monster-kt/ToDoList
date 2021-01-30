/*
 * @Descripttion:
 * @version:
 * @Author: surui
 * @Date: 2021-01-29 21:06:17
 * @LastEditors: surui
 * @LastEditTime: 2021-01-30 20:59:06
 */
$(function () {
    load();
    $("#title").on("keydown", function (e) {
        // 回车键asicii码13
        if ($(this).val()) {
            if (e.keyCode === 13) {
                // 先读取本地存储的数据
                let local = getDate();
                // 追加数据
                local.push({ title: $(this).val(), done: false });
                // 保存
                save(local);
                $(this).val("")
                load();
            }
        } else {
            alert("请输入内容")
        }

    });
    // 读取本地存储的数据
    function getDate() {
        let data = localStorage.getItem("todolist");
        if (data !== null) {
            // 本地存储的是字符串格式，但我们需要的是对象格式的
            return JSON.parse(data);
        }
        else return [];
    };
    // 保存数据
    function save(local) {
        localStorage.setItem("todolist", JSON.stringify(local));
    };
    // 加载数据
    function load() {
        let data = getDate();
        let doneCount = 0;
        let todoCount = 0;
        $(".todolist,.donelist").empty();
        $.each(data, function (i, n) {
            if (n.done) {
                doneCount++;
                $(".donelist").prepend("<li><input type='checkbox' checked><p>" + n.title + "</p><a href='#' data-index=" + i + "></a></li>")
            } else {
                todoCount++;
                $(".todolist").prepend("<li><input type='checkbox'><p>" + n.title + "</p><a href='#' data-index=" + i + "></a></li>")
            }
        })
        $(".ing-it").text(todoCount);
        $(".fin-it").text(doneCount);
    };
    // 删除
    $(".todolist,.donelist").on("click", "a", function () {
        let data = getDate();
        let index = $(this).attr("data-index");
        data.splice(index, 1);
        save(data);
        load();
    });
    // 正在进行和已经完成
    $("ul").on("click", "input", function () {
        let data = getDate();
        let index = $(this).siblings("a").attr("data-index");
        data[index].done = $(this).prop("checked");
        save(data);
        load();
    })

})