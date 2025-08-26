import { saveAs } from 'file-saver';

const convertToCSV = (data) => {
    const headers = data.header.map(name => name.headerName);
    const fields = data.header.map(name => name.field);
    const rows = data.data.map(row =>
        fields.map(field => {
            const value = row[field];
            return value ? `"${value}"` : "";
        }).join(',')
    );
    return [headers.join(','), ...rows].join('\n');
};

export const downloadCSV = (data, fileName) => {
    const csv = convertToCSV(data);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const name = `${fileName}_${new Date()}.csv`;
    saveAs(blob, name);
};
