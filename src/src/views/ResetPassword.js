import { Link } from "react-router-dom"
import { Row, Col, CardTitle, CardText, Form, FormGroup, Label, Button } from "reactstrap"
import "@styles/base/pages/page-auth.scss"
import { ChevronLeft } from "react-feather"
import InputPassword from '@components/input-password-toggle'

const ResetPassword = () => {

  return (
    <div className="auth-wrapper auth-v2">
      <Row className="auth-inner m-0">
        <Col className="d-none d-lg-block auth-left" lg="8" sm="12">
        </Col>
        <Col
          className="d-flex align-items-center auth-bg px-2 p-lg-5"
          lg="4"
          sm="12"
        >
          <Col className="px-xl-2 mx-auto" sm="8" md="6" lg="12">
            <CardTitle tag="h2" className="font-weight-bold mb-1">
            Réinitialiser le mot de passe 🔒
            </CardTitle>
            <CardText className='mb-2'>Votre nouveau mot de passe doit être différent des mots de passe utilisés précédemment.</CardText>
            <Form className='auth-reset-password-form mt-2' onSubmit={e => e.preventDefault()}>
              <FormGroup>
                <Label className='form-label' for='new-password'>
                 Nouveau mot de passe
                </Label>
                <InputPassword className='input-group-merge' id='new-password' autoFocus />
              </FormGroup>
              <FormGroup>
                <Label className='form-label' for='confirm-password'>
                  Confirmer le mot de passe
                </Label>
                <InputPassword className='input-group-merge' id='confirm-password' />
              </FormGroup>
              <Button.Ripple color='primary' block>
                Définir un nouveau mot de passe
              </Button.Ripple>
            </Form>
            <p className='text-center mt-2'>
              <Link to='/login'>
                <ChevronLeft className='mr-25' size={14} />
                <span className='align-middle'>Retour au login</span>
              </Link>
            </p>
          </Col>
        </Col>
      </Row>
    </div>
  )
}

export default ResetPassword
