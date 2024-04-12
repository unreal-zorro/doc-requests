export const RequestTable = () => {
  return (
    <>
      <h2>Таблица с информацией о заявках</h2>

      <table>
        <thead>
          <tr>
            <th>Наименование документа</th>
            <th>Количество заявок</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>Документ 1</td>
            <td>10</td>
          </tr>

          <tr>
            <td>Документ 2</td>
            <td>5</td>
          </tr>

          <tr>
            <td>Документ 3</td>
            <td>2</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};
