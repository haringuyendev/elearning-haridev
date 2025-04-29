import XLSX from 'xlsx-js-style';

export function setAutoWidth(sheet: any, data: any) {
    const MIN_WIDTH_PX = 100;
    const MAX_WIDTH_PX = 400;
    const CHAR_TO_PX = 7;
    let colWidths = data[0].map((_:any, i: number) => {
        let maxLen = 10;
        data.forEach((row: any[]) => {
            if (row[i] && row[i].toString().length > maxLen) {
                maxLen = row[i].toString().length;
            }
        });
        let pxWidth = Math.max(Math.min(maxLen * CHAR_TO_PX, MAX_WIDTH_PX), MIN_WIDTH_PX);
        return { wpx: pxWidth };
    });
    sheet['!cols'] = colWidths;

    const range = XLSX.utils.decode_range(sheet['!ref']);
    for (let row = range.s.r; row <= range.e.r; row++) {
        for (let col = range.s.c; col <= range.e.c; col++) {
            const cellRef = XLSX.utils.encode_cell({ r: row, c: col });
            if (sheet[cellRef]) {
                sheet[cellRef].s = sheet[cellRef].s || {};
                sheet[cellRef].s.alignment = sheet[cellRef].s.alignment || {};
                sheet[cellRef].s.alignment.wrapText = true;
            }
        }
    }
}

export function colorHeader(sheet: any) {
    const range = XLSX.utils.decode_range(sheet['!ref']);
    for (let col = range.s.c; col <= range.e.c; col++) {
        const cellRef = XLSX.utils.encode_cell({ r: 0, c: col });
        if (!sheet[cellRef]) continue;
        sheet[cellRef].s = sheet[cellRef].s || {};
        sheet[cellRef].s.fill = {
            patternType: 'solid',
            fgColor: { rgb: '1c4587' },
        };
        sheet[cellRef].s.font = sheet[cellRef].s.font || {};
        sheet[cellRef].s.font.color = { rgb: 'FFFFFF' };
        sheet[cellRef].s.font.bold = true;
    }
};

export const addBorders = (sheet: any) => {
    const range = XLSX.utils.decode_range(sheet['!ref']);

    for (let row = range.s.r; row <= range.e.r; row++) {
        for (let col = range.s.c; col <= range.e.c; col++) {
            const cellRef = XLSX.utils.encode_cell({ r: row, c: col });
            if (!sheet[cellRef].v) {
                sheet[cellRef] = { t: 's', v: '' };
            }
            sheet[cellRef].s = sheet[cellRef].s || {};
            sheet[cellRef].s.border = {
                top: { style: 'thin', color: { rgb: '000000' } },
                bottom: { style: 'thin', color: { rgb: '000000' } },
                left: { style: 'thin', color: { rgb: '000000' } },
                right: { style: 'thin', color: { rgb: '000000' } }
            };
        }
    }
};

export const addBordersExport = (sheet: any) => {
    const range = XLSX.utils.decode_range(sheet['!ref']);

    for (let row = range.s.r; row <= range.e.r; row++) {
        for (let col = range.s.c; col <= range.e.c; col++) {
            const cellRef = XLSX.utils.encode_cell({ r: row, c: col });
            if (!sheet[cellRef]) {
                sheet[cellRef] = { t: 's', v: '' };
            }
            sheet[cellRef].s = sheet[cellRef].s || {};
            sheet[cellRef].s.border = {
                top: { style: 'thin', color: { rgb: '000000' } },
                bottom: { style: 'thin', color: { rgb: '000000' } },
                left: { style: 'thin', color: { rgb: '000000' } },
                right: { style: 'thin', color: { rgb: '000000' } }
            };
        }
    }
};

export async function downloadExcel({
    templateUrl,
    data,
    sheetName = 'Sheet2',
    exportFileName = 'Exported.xlsx',
    hasExpandSheet = false,
}: {
    templateUrl: string;
    data: any[];
    sheetName?: string;
    exportFileName?: string;
    hasExpandSheet?: boolean;
}) {
    const wb = XLSX.utils.book_new();

    const response = await fetch(templateUrl);
    if (!response.ok) throw new Error('Failed to fetch the template');
    const arrayBuffer = await response.arrayBuffer();
    const templateData = new Uint8Array(arrayBuffer);
    const workbook = XLSX.read(templateData, { cellStyles: true });

    const padRow = (row: any[], length: number) => {
        while (row.length < length) row.push('');
        return row;
    };

    workbook.SheetNames.forEach(sheetName => {
        const sheet = workbook.Sheets[sheetName];
        addBorders(sheet);
        colorHeader(sheet);
        XLSX.utils.book_append_sheet(wb, sheet, sheetName);
    });

    if (hasExpandSheet) {
        const colCount = data[0].length;
        const paddedData = data.map(row => padRow([...row], colCount));

        const sheetExpand = XLSX.utils.aoa_to_sheet(paddedData);
        addBorders(sheetExpand);
        colorHeader(sheetExpand);
        setAutoWidth(sheetExpand, paddedData);
        XLSX.utils.book_append_sheet(wb, sheetExpand, sheetName);
    }

    XLSX.writeFile(wb, exportFileName);
}

export async function exportExcel({
    data,
    exportFileName = 'Exported.xlsx',
}: {
    data: any[];
    exportFileName?: string;
}) {
    const wb = XLSX.utils.book_new();

    const padRow = (row: any[], length: number) => {
        while (row.length < length) row.push('');
        return row;
    };

    data.forEach((element: any[]) => {
        let colCount = element.length;
        let paddedData = element.map(row => padRow([...row], colCount));

        let sheetExpand = XLSX.utils.aoa_to_sheet(paddedData);
        addBordersExport(sheetExpand);
        colorHeader(sheetExpand);
        setAutoWidth(sheetExpand, paddedData);
        XLSX.utils.book_append_sheet(wb, sheetExpand);
    });

    XLSX.writeFile(wb, exportFileName);
}