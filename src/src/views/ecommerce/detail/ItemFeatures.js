// ** React Imports
import { Row, Col, CardText } from 'reactstrap'
import { Award, Clock, Shield } from 'react-feather'

const ItemFeatures = () => {
  return (
    <div className='item-features'>
      <Row className='text-center'>
        <Col className='mb-4 mb-md-0' md='4' xs='12'>
          <div className='w-75 mx-auto'>
            <Award />
            <h4 className='mt-2 mb-1'>100% Original</h4>
            <CardText>Barre chocolatée, sucre d'orge, crème glacée, caramel. Croissant, tarte, biscuit, halvah.</CardText>
          </div>
        </Col>
        <Col className='mb-4 mb-md-0' md='4' xs='12'>
          <div className='w-75 mx-auto'>
            <Clock />
            <h4 className='mt-2 mb-1'>10 Remplacement d'un jour</h4>
            <CardText>Guimauve biscuit donut dragée gâteau aux fruits. Cupcake à la gaufrette Jujubes.</CardText>
          </div>
        </Col>
        <Col className='mb-4 mb-md-0' md='4' xs='12'>
          <div className='w-75 mx-auto'>
            <Shield />
            <h4 className='mt-2 mb-1'>1 Garantie d'un an</h4>
            <CardText>Barbe à papa gâteau de pain d'épice J'aime la prune à sucre J'aime le croissant sucré.</CardText>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default ItemFeatures
