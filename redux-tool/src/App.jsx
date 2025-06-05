import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Row, Col } from 'react-bootstrap'
import Todos from './Components/Todos'
import Addtodo from './Components/addTodo'

function App() {
  return (
    <Container fluid className="app-container">
      <Row className="justify-content-center">
        <Col lg={10} xl={8}>
          <div className="app-header">
            <h1 className="app-title">Manage your Todoz</h1>
            <p className="app-subtitle">Organize your tasks with priority</p>
          </div>
          
          <div className="main-content">
            <Addtodo />
            <Todos />
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default App
