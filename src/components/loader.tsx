export interface LoaderProps {
  text?: string;
}

export const Loader = (props: LoaderProps) => {
  const { text = 'Загрузка...' } = props;

  return <h2>{text}</h2>;
};
