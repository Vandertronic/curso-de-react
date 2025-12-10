function Button(props) {
  return (
    <button {...props} className="bg-slate-500 text-white p-2 rounded-md">
      {props.children}
    </button>
  );
}

export default Button;

//Quando usamos {...props} estamos fazendo com que o componente criado use todos os atributos
//do componente principal, como: onClick, Value e assim por diante.
