import TinyReact from "./TinyReact";

const root = document.getElementById("root");

const virtualDOM = (
  <div className="container">
    <h1>你好 Tiny React</h1>
    <h2>(编码必杀技)</h2>
    <div test="123">
      嵌套1 <div>嵌套 1.1</div>
    </div>
    <h3>(观察: 这个将会被改变)</h3>
    {2 == 1 && <div>如果2和1相等渲染当前内容</div>}
    {2 == 2 && <div>2</div>}
    <span>这是一段内容</span>
    <button onClick={() => alert("你好")}>点击我</button>
    <h3>这个将会被删除</h3>
    2, 3
    <input value="13" />
  </div>
);
const NewvirtualDOM = (
  <div className="container">
    <h1>你好 Tiny React</h1>
    <h2>(编码必杀技)</h2>
    <div data-test="test123">
      嵌套1 <div>嵌套 1.1</div>
    </div>
    <h3>(观察: 这个将会被改变)</h3>
    {2 == 1 && <div>如果2和1相等渲染当前内容</div>}
    {2 == 2 && <div>2</div>}
    <span>这是一段被修改锅的内容</span>
    <button onClick={() => alert("你好！！！！")}>点击我</button>
    <h3>这个将会被删除</h3>
    2, 3
    <input value="13" />
  </div>
);

TinyReact.render(virtualDOM, root);
setTimeout(() => {
  TinyReact.render(NewvirtualDOM, root);
}, 2000);

const Demo = () => <div>Hello Demo!</div>;
const Heart = (props) => {
  const { title } = props;
  return (
    <div>
      &hearts;{title}
      <Demo />
    </div>
  );
};
// TinyReact.render(<Heart title="Hello React!" />, root);

class Alert extends TinyReact.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <div>{this.props.name}</div>
        <div>{this.props.age}</div>
        Hello Class Component!
      </div>
    );
  }
}
// TinyReact.render(<Alert name="张三" age={20} />, root);
