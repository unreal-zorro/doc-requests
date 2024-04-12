export const RequestForm = () => {
  return (
    <>
      <h2>Форма для отправки заявок</h2>

      <form>
        <label htmlFor="user">ФИО конструктора</label>
        <select id="user" name="user">
          <option value="" disabled selected>
            {' '}
            ФИО{' '}
          </option>
          <option value="1">Иванов И.И.</option>
          <option value="2">Петров П.П.</option>
          <option value="3">Сидоров С.С.</option>
        </select>

        <label htmlFor="document">Наименование документа</label>
        <input id="document" type="text" name="document" placeholder="Документ" />

        <p>Вы уже отправляли заявку на этот документ, она уже была учтена</p>

        <button type="submit">Отправить заявку</button>
      </form>
    </>
  );
};
