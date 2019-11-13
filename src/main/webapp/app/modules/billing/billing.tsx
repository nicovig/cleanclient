import './billing.scss';

import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input, CustomInput, Row, Col, Progress, Container, Tooltip, Jumbotron } from 'reactstrap';
import { BillingModal } from './billing-modal';
import { IRootState } from 'app/shared/reducers';
import { createEntity, getSearch, resetFactureSearch } from 'app/entities/facture/facture.reducer';
import { IFacture } from 'app/shared/model/facture.model';
import { handleRegister } from 'app/modules/account/register/register.reducer';

export interface IBillingProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IBillingState {
  particulier: boolean;
  raisonSociale: string;
  raisonSocialeTmp: string;
  siret: string;
  nom: string;
  prenom: string;
  telephone: string;
  noVoie: string;
  rue: string;
  cp: string;
  ville: string;
  mail: string;
  motDePasse: string;
  montant: number;
  tva : number;
  hash:string;
  tooltipMailOpen: boolean,
  tooltipMdpOpen: boolean,
  tooltipAuthOpen: boolean,
  modal: boolean;
  errorMessagesMail: string;
  errorMessagesMdp: string;
  mailconfirm: string,
  mdpconfirm: string,
  confMail: boolean;
  confTel:boolean;
  isSubmit:boolean;
  motDePasseConf : boolean;
}

export class Billing extends React.Component<IBillingProps, IBillingState> {
  constructor(props) {
    super(props);
    this.state = {
      particulier: false,
      raisonSociale: '',
      raisonSocialeTmp: '',
      siret: '',
      nom: '',
      prenom: '',
      telephone: '',
      noVoie: '',
      rue: '',
      cp: '',
      ville: '',
      mail: '',
      motDePasse: '',
      montant: 0,
      tva : 0,
      hash:'',
      tooltipMailOpen: false,
      tooltipMdpOpen: false,
      tooltipAuthOpen: false,
      modal: false,
      errorMessagesMail: '',
      errorMessagesMdp:'',
      mailconfirm: '',
      mdpconfirm: '',
      confMail: false,
      confTel:false,
      isSubmit:false,
      motDePasseConf: false
    };
  }

  toggleToolTipMail = () => {
    this.setState({
      tooltipMailOpen: !this.state.tooltipMailOpen
    });
  };
  toggleToolTipMdp = () => {
    this.setState({
      tooltipMdpOpen: !this.state.tooltipMdpOpen
    });
  };
  toggleToolTipAuth = () => {
    this.setState({
      tooltipAuthOpen: !this.state.tooltipAuthOpen
    });
  };

  handleChangeParticulier = () => {
    if (this.state.particulier === false) {
      this.setState({ particulier: true });
    } else {
      this.setState({ particulier: false });
    }
  };

  handleSearchOnBlur = e => {
    this.props.getSearch({ raisonSociale: e.target.value });
  };

  handleConfTel = ({ target: { value } }) => {
    value = value
      // Remove all non-digits, turn initial 33 into nothing
      .replace(/\D+/, '')
      .replace(/^330?/, '0')
      // Stick to first 14, ignore later digits
      .slice(0, 14)
      // Add a space after any 2-digit group followed by more digits
      .replace(/(\d{2})(?=\d)/g, '$1 ')
    this.setState({ telephone : value });
    this.setState({ confTel : true });
  }

  handleConfMail = () => {
    if(this.state.mail !== this.state.mailconfirm){
      const errorMail = 'Les emails ne sont pas identiques';
      this.setState({errorMessagesMail : errorMail});
    }
    else{
      const errorMail = null;
      this.setState({errorMessagesMail : errorMail});
      this.setState({confMail : true });
    } 
  }

  handleConfMdp = () => {
    if(this.state.motDePasse !== this.state.mdpconfirm){
      const errorMdp = 'Les mots de passe ne sont pas identiques';
      this.setState({ errorMessagesMdp : errorMdp });
    }
    else{
      const errorMdp = null;
      this.setState({ errorMessagesMdp : errorMdp });
      this.setState({ motDePasseConf : true });
    } 
  }

  componentDidMount() {
    this.state.particulier;
    this.state.isSubmit
  }

  handleChangeState = field => event => {
    this.setState({ [field]: event.target.value });
  }

  handleSubmit = () => {
    if(this.state.confMail && this.state.confTel) {
      const entity : IFacture = {
        particulier: this.state.particulier,
        raisonSociale: this.state.raisonSociale,
        siret: this.state.siret,
        nom: this.state.nom,
        prenom: this.state.prenom,
        telephone: this.state.telephone,
        noVoie: this.state.noVoie,
        rue: this.state.rue,
        cp: this.state.cp,
        ville: this.state.ville,
        mail: this.state.mailconfirm,
        tva: this.state.tva,
        montant: this.state.montant,
        hash: this.props.match.params.id,
        loginUser : this.state.mailconfirm,
        mailUser : this.state.mailconfirm,
        passwordUser : this.state.mdpconfirm
      }
      this.props.createEntity(entity);
      if (this.state.isSubmit === false) {
        this.setState({ isSubmit: true });
        //this.props.handleRegister(this.state.mailconfirm, this.state.mailconfirm, this.state.mdpconfirm,);
      } else {
       
      } 
    }
  }

  _handleChooseResult = result => {
    if (result) {
      this.setState({ raisonSociale: result.denomination });
      this.setState({ siret: result.siret });
      this.setState({ noVoie: result.housenumber });
      this.setState({ rue: result.street });
      this.setState({ cp: result.codepostal });
      this.setState({ ville: result.ville });
    }
    this.props.resetFactureSearch();
  };

  _toggleChooseResultModal = () => {
    this.props.resetFactureSearch();
  };

  render() {
    return (
      <Container>
        <div className="text-container">
          <div className="text-animation">
            <span>Votre facture</span>
          </div>
        </div>
            <Jumbotron>
            <p className="lead">
              Pour éditer une facture et l'envoyer sur votre adresse e-mail nous avons besoin des informations ci-dessous.
            </p>
            <hr className="my-2" />
          <Form>
              <FormGroup>
                <Label for="exampleCheckbox" />
                <div>
                  <CustomInput
                    type="switch"
                    id="particulier"
                    name="particulier"
                    size="lg"
                    label="Je suis un particulier"
                    onClick={this.handleChangeParticulier}
                  />
                </div>
              </FormGroup>
           </Form>
          </Jumbotron>
          <form>
            <div>
              {this.state.particulier ? (
                <div />
              ) : (
                <div>
                  <FormGroup row>
                    <Col md={3} />
                    <Label md={1}>Raison sociale</Label>
                    <Col>
                      <Input
                        type="text"
                        name="raisonSociale"
                        onBlur={this.handleSearchOnBlur}
                        onChange={this.handleChangeState('raisonSociale')}
                        value={this.state.raisonSociale}
                        md={4}
                        required
                      />
                    </Col>
                    <BillingModal
                      searchResult={this.props.search}
                      chooseResult={this._handleChooseResult}
                      toggle={this._toggleChooseResultModal}
                    />
                    <Col md={3} />
                  </FormGroup>
                  <FormGroup row>
                    <Col md={3} />
                    <Label md={1}>N° de SIRET</Label>
                    <Col>
                      <Input type="text" name="siret" md={4} value={this.state.siret} onChange={this.handleChangeState('siret')} required />
                    </Col>
                    <Col md={3} />
                  </FormGroup>
                  <Row>
                    <Col md={2} />
                    <Col>
                      <Progress className="bar" style={{ height: '7px' }}>
                        <Progress bar value="100" />
                      </Progress>
                    </Col>
                    <Col md={2} />
                  </Row>
                  <br />
                </div>
              )}
            </div>
            <FormGroup row>
              <Col md={3} />
                <Label md={1}>Nom</Label>
              <Col>
                <Input type="text" name="nom" md={4} required value={this.state.nom} onChange={this.handleChangeState('nom')} />
              </Col>
              <Col md={3} />
            </FormGroup>
            <Row>
              <Col md={3} />
              <Col md={3}>
                <FormGroup>
                  <Label>Prénom</Label>
                  <Input type="text" name="prenom" required value={this.state.prenom} onChange={this.handleChangeState('prenom')} />
                </FormGroup>
              </Col>
              <Col md={3}>
                <FormGroup>
                  <Label>Téléphone</Label>
                  <Input type="string" 
                         name="telephone"  
                         required 
                         value={this.state.telephone} 
                         onBlur={this.handleConfTel} 
                         onChange={this.handleChangeState('telephone')} 
                         />
                </FormGroup>
              </Col>
              <Col md={3} />
            </Row>
            <Row>
              <Col md={3} />
              <Col md={4}>
                <FormGroup>
                  <Label>Rue</Label>
                  <Input type="text" name="rue" value={this.state.rue} onChange={this.handleChangeState('rue')} required />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label>N° de voie</Label>
                  <Input type="text" name="noVoie" value={this.state.noVoie} onChange={this.handleChangeState('noVoie')} required />
                </FormGroup>
              </Col>
              <Col md={3} />
            </Row>
            <Row>
              <Col md={3} />
              <Col>
                <FormGroup>
                  <Label>Code postal</Label>
                  <Input type="text" name="cp" value={this.state.cp} onChange={this.handleChangeState('cp')} required />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label>Ville</Label>
                  <Input type="text" name="ville" value={this.state.ville} onChange={this.handleChangeState('ville')} required />
                </FormGroup>
              </Col>
              <Col md={3} />
            </Row>
            <Row>
              <Col md={2} />
              <Col>
                <Progress className="bar" style={{ height: '7px' }}>
                  <Progress bar value="100" />
                </Progress>
              </Col>
              <Col md={2} />
            </Row>
            <br />
            <Row>
              <Col></Col>
                <h2>Création de votre compte</h2>
              <Col></Col>
            </Row>   
            <Row>
              <Col>
                <div>
                  {this.state.mail !== this.state.mailconfirm ?                
                    <h6>{this.state.errorMessagesMail}</h6>
                  :
                    <h6></h6>
                  }
                </div>
              </Col> 
            </Row>
            <br />
            <FormGroup row>
              <Col md={3} />
              <Label md={2}>E-Mail</Label>
              <Col>
                <Input type="text" name="mail" md={4} required value={this.state.mail} onChange={this.handleChangeState('mail')}/>
              </Col>
              <Col md={3} />
            </FormGroup>
            <FormGroup row>
              <Col md={3} />
              <Label id="email" md={2}>
                <span style={{ textDecoration: 'none', color: 'blue' }}>Confirmation E-Mail</span>
              </Label>
              <Tooltip placement="left" isOpen={this.state.tooltipMailOpen} target="email" toggle={this.toggleToolTipMail}>
                Veuillez confirmer votre e-mail
              </Tooltip>
              <Col>
                <Input type="email" name="emailConf" md={4} required value={this.state.mailconfirm} onBlur={this.handleConfMail} onChange={this.handleChangeState('mailconfirm')}/>
              </Col>
              <Col md={3} />
            </FormGroup>
            <br />
            <Row>
              <Col>
                <div>
                {this.state.motDePasse !== this.state.mdpconfirm ? 
                  <h6>{this.state.errorMessagesMdp}</h6>
                :
                  <h6></h6>
                }
                </div>
              </Col> 
            </Row>
            <FormGroup row>
              <Col md={3} />
              <Label md={2}>Mot de passe</Label>
              <Col>
                <Input type="password" name="motDePasse" md={4} required value={this.state.motDePasse} onChange={this.handleChangeState('motDePasse')}/>
              </Col>
              <Col md={3} />
            </FormGroup>
            <FormGroup row>
              <Col md={3} />
              <Label id="mdp" md={2}>
                <span style={{ textDecoration: 'none', color: 'blue' }}>Confirmation du mot de passe</span>
              </Label>
              <Tooltip placement="left" isOpen={this.state.tooltipMdpOpen} target="mdp" toggle={this.toggleToolTipMdp}>
                Veuillez confirmer votre mot de passe
              </Tooltip>
              <Col>
                <Input type="password" name="motDePasseConf" md={4} required value={this.state.mdpconfirm} onBlur={this.handleConfMdp} onChange={this.handleChangeState('mdpconfirm')}/>
              </Col>
              <Col md={3} />
            </FormGroup>
            <Row>
            <Col/>
            {this.state.isSubmit ? 
              <Col>
                <h5>Un mail d'authentification vient de vous être envoyé à l'adresse suivante</h5>
                <h5 id="auth">{this.state.mailconfirm}</h5>
                <Tooltip placement="left" isOpen={this.state.tooltipAuthOpen} target="auth" toggle={this.toggleToolTipAuth}>
                  Si cette adresse email n'est pas la bonne, vous pouvez recréer un compte en mettant votre adresse mail puis en cliquant sur le bouton ci-dessous
                </Tooltip>
              </Col>
            :
              <Col></Col>
            }
            <br/>
            <Col/>
            </Row>
            <br/>  
            <Row> 
              <Col/>
              <Col>
                <Button onClick={() => this.handleSubmit()}>Recevoir mes résultats, ma facture et créer mon compte</Button>
              </Col>  
              <Col/>
            </Row>
            <br/>
          </form>
      </Container>
    );
  }
}

const mapStateToProps = ({ importFichier, facture }: IRootState) => ({
  importFichierEntity: importFichier.entity,
  status: importFichier.status,
  result: importFichier.result,
  facture: facture.entity,
  search: facture.searchResult,
  pdfBase64 : facture.pdfBase64

});

const mapDispatchToProps = { getSearch, resetFactureSearch, createEntity, handleRegister };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Billing);
