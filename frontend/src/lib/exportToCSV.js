export const exportToCSV = (expenses, fileName = "expenses") => {
    if (!expenses || !expenses.length) return;
  
    const headers = ["Title", "Amount", "Category", "Notes", "Date"];
  
    const escapeCSV = (value) => {
      if (value === null || value === undefined) return "";
      const stringValue = value.toString();
      return `"${stringValue.replace(/"/g, '""')}"`;
    };
  
    const rows = expenses.map((expense) => [
      escapeCSV(expense.title),
      expense.amount,
      escapeCSV(expense.category),
      escapeCSV(expense.note),
      escapeCSV(new Date(expense.date).toLocaleDateString("en-IN")),
    ]);
  
    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.join(",")),
    ].join("\n");
  
    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });
  
    const url = URL.createObjectURL(blob);
  
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${fileName}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  
    URL.revokeObjectURL(url);
  };
  