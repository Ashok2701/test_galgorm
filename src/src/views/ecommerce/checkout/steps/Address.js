// ** Utils
import { isObjEmpty } from '@utils'

// ** Third Party Components
import classnames from 'classnames'
import { useForm } from 'react-hook-form'
import {
  Form,
  Input,
  Card,
  Label,
  FormGroup,
  CardHeader,
  CardTitle,
  CardBody,
  CardText,
  Button,
  Row,
  Col
} from 'reactstrap'

const Address = props => {
  // ** Props
  const { stepper } = props

  // ** Vars
  const { register, errors, handleSubmit, trigger } = useForm()

  // ** On form submit if there are no errors then go to next step
  const onSubmit = () => {
    trigger()
    if (isObjEmpty(errors)) {
      stepper.next()
    }
  }

  return (
    <Form className='list-view product-checkout' onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardHeader className='flex-column align-items-start'>
          <CardTitle tag='h4'>Ajouter une nouvelle adresse</CardTitle>
          <CardText className='text-muted mt-25'>
           Veillez à cocher la case "Livrer à cette adresse" lorsque vous avez terminé.
          </CardText>
        </CardHeader>
        <CardBody>
          <Row>
            <Col md='6' sm='12'>
              <FormGroup className='mb-2'>
                <Label for='checkout-name'>Nom complet :</Label>
                <Input
                  name='checkout-name'
                  id='checkout-name'
                  placeholder='John Doe'
                  innerRef={register({ required: true })}
                  className={classnames({ 'is-invalid': errors['checkout-name'] })}
                />
              </FormGroup>
            </Col>
            <Col md='6' sm='12'>
              <FormGroup className='mb-2'>
                <Label for='checkout-number'>Nombre :</Label>
                <Input
                  type='number'
                  name='checkout-number'
                  id='checkout-number'
                  placeholder='0123456789'
                  innerRef={register({ required: true })}
                  className={classnames({ 'is-invalid': errors['checkout-number'] })}
                />
              </FormGroup>
            </Col>
            <Col md='6' sm='12'>
              <FormGroup className='mb-2'>
                <Label for='checkout-apt-number'>Appartement, maison n° :</Label>
                <Input
                  type='number'
                  name='checkout-apt-number'
                  id='checkout-apt-number'
                  placeholder='9447 Glen Eagles Drive'
                  innerRef={register({ required: true })}
                  className={classnames({ 'is-invalid': errors['checkout-apt-number'] })}
                />
              </FormGroup>
            </Col>
            <Col md='6' sm='12'>
              <FormGroup className='mb-2'>
                <Label for='checkout-landmark'>Point de repère, par exemple près de l'hôpital Apollo :</Label>
                <Input
                  name='checkout-landmark'
                  id='checkout-landmark'
                  placeholder="Près de l'hôpital Apollo"
                  innerRef={register({ required: true })}
                  className={classnames({ 'is-invalid': errors['checkout-landmark'] })}
                />
              </FormGroup>
            </Col>
            <Col md='6' sm='12'>
              <FormGroup className='mb-2'>
                <Label for='checkout-city'>Ville :</Label>
                <Input
                  name='checkout-city'
                  id='checkout-city'
                  placeholder='Tokyo'
                  innerRef={register({ required: true })}
                  className={classnames({ 'is-invalid': errors['checkout-city'] })}
                />
              </FormGroup>
            </Col>
            <Col md='6' sm='12'>
              <FormGroup className='mb-2'>
                <Label for='checkout-pincode'>Code postal :</Label>
                <Input
                  type='number'
                  name='checkout-pincode'
                  id='checkout-pincode'
                  placeholder='201301'
                  innerRef={register({ required: true })}
                  className={classnames({ 'is-invalid': errors['checkout-pincode'] })}
                />
              </FormGroup>
            </Col>
            <Col md='6' sm='12'>
              <FormGroup className='mb-2'>
                <Label for='checkout-state'>État :</Label>
                <Input
                  name='checkout-state'
                  id='checkout-state'
                  placeholder='California'
                  innerRef={register({ required: true })}
                  className={classnames({ 'is-invalid': errors['checkout-state'] })}
                />
              </FormGroup>
            </Col>
            <Col md='6' sm='12'>
              <FormGroup className='mb-2'>
                <Label for='add-type'>Type d'adresse :</Label>
                <Input type='select' name='add-type' id='add-type'>
                  <option value='home'>Accueil</option>
                  <option value='work'>Travail</option>
                </Input>
              </FormGroup>
            </Col>
            <Col sm='12'>
              <Button.Ripple type='submit' className='btn-next delivery-address' color='primary'>
                Sauvegarder et livrer ici
              </Button.Ripple>
            </Col>
          </Row>
        </CardBody>
      </Card>
      <div className='customer-card'>
        <Card>
          <CardHeader>
            <CardTitle tag='h4'>John Doe</CardTitle>
          </CardHeader>
          <CardBody>
            <CardText className='mb-0'>9447 Glen Eagles Drive</CardText>
            <CardText>Lewis Center, OH 43035</CardText>
            <CardText>UTC-5: Eastern Standard Time (EST)</CardText>
            <CardText>202-555-0140</CardText>
            <Button.Ripple
              block
              type='button'
              color='primary'
              onClick={() => stepper.next()}
              className='btn-next delivery-address mt-2'
            >
             Livrer à cette adresse
            </Button.Ripple>
          </CardBody>
        </Card>
      </div>
    </Form>
  )
}

export default Address
