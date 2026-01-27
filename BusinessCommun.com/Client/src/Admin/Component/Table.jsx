import "./Table.css";

export default function Table({ columns, data, actions }) {

  // ✅ Column mapping (Frontend solution)
  const keyMap = {
    ID: "id",
    Name: "name",
    Industry: "domainName",     
    Location: "city",          
    Status: "status",
    Email: "email"
  };

  return (
    <div className="admin-table-wrapper">
      <table className="admin-table">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col}>{col}</th>
            ))}
            {actions && <th>Actions</th>}
          </tr>
        </thead>

        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length + 1}>
                No Records Found
              </td>
            </tr>
          ) : (
            data.map((row) => (
              <tr key={row.id}>
                {columns.map((col) => (
                  <td key={col}>
                    {row[keyMap[col]] ?? "-"}
                  </td>
                ))}

                {actions && (
                  <td>
                    <div className="table-actions">
                      {actions(row)}
                    </div>
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
