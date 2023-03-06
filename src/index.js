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
    <span className="old-class">这是一段内容</span>
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
    <h6>(观察: 这个将会被改变)</h6>
    {2 == 1 && <div>如果2和1相等渲染当前内容</div>}
    {2 == 2 && <div>2</div>}
    <span>这是一段被修改锅的内容</span>
    <button onClick={() => alert("你好！！！！")}>点击我</button>
    <input value="13" />
  </div>
);

// TinyReact.render(virtualDOM, root);
// setTimeout(() => {
//   TinyReact.render(NewvirtualDOM, root);
// }, 2000);

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

class Alert extends TinyReact.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "default title",
    };
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.setState({
      title: "changed title",
    });
  }

  render() {
    console.log("this.state", this.state);
    return (
      <div>
        <div>{this.props.name}</div>
        <div>{this.props.age}</div>
        <div>{this.state.title}</div>
        <button onClick={this.onClick}>改变 title</button>
      </div>
    );
  }
}

class DemoRef extends TinyReact.Component {
  handle() {
    let value = this.input.value;
    console.log(value);
    console.log(this.alert);
  }
  componentDidMount() {
    console.log("componentDidMount");
  }
  render() {
    return (
      <div>
        <input type="text" ref={(input) => (this.input = input)} />
        <Alert name="李四" age={25} ref={(alert) => (this.alert = alert)} />
        <button onClick={this.handle.bind(this)}>按钮</button>
      </div>
    );
  }
}

TinyReact.render(<DemoRef />, root);
// setTimeout(() => {
//   TinyReact.render(<Alert name="李四" age={25} />, root);
//   // TinyReact.render(<Heart title="Hello React!" />, root);
// }, 2000);
