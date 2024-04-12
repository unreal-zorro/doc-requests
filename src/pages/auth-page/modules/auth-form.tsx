export const AuthForm = () => {
  return (
    <>
      <h2>Форма входа</h2>

      <form>
        <label htmlFor="username">Имя пользователя</label>
        <input id="user" type="text" name="user" placeholder="Имя" />
        <p>Неверное имя пользователя</p>

        <label htmlFor="document">Пароль</label>
        <input id="document" type="text" name="document" placeholder="Пароль" />
        <p>Неверный пароль</p>

        <button type="submit">Войти</button>
      </form>
    </>
  );
};
