import fs from "fs-extra"
import { parse } from "csv-parse/sync";
import XLSX from "xlsx";


/**
 * 解析 i18n
 */
function parseLocalization(version) {
    if (!version) {
        throw new Error("请添加文件版本！")
    }
    const path = `./Localization/Localization-v${version}.xlsx`;
    if (fs.existsSync(path)) {
        throw new Error("文件已存在！")
    } else {
        const localization = fs.readFileSync("./Data/Config/Localization.txt").toString();

        const records = parse(localization, {
            columns: true,           // 是否把第一行作为列名
            skip_empty_lines: true,  // 跳过空行
            trim: true,              // 去掉首尾空格
        });

        const ws = XLSX.utils.json_to_sheet(records);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "localization");
        XLSX.writeFile(wb, path);
    }
}

parseLocalization("2.4")