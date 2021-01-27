import { Component, OnInit } from '@angular/core'
import { Validators, FormBuilder, FormGroup, ValidatorFn } from '@angular/forms'
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Address } from 'src/app/models/address.model'
import { RequestCreate, ResponseCreate } from 'src/app/models/users.model';
import { AddressService } from 'src/app/services/address.service'
import { UsersService } from 'src/app/services/users.service';


@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})


export class CadastroComponent implements OnInit {

  registerForm: FormGroup;

  public request: RequestCreate = {
    nome: '',
    sobrenome: '',
    nascimento: null,
    cpf: null,
    email: '',
    cep: null,
    logradouro: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    uf: '',
    tel: null,
    senha: '',
  }

  response: ResponseCreate

  public address: Address = {
    address_estado: "",
    address_cidade: "",
    address_bairro: "",
    address_endereco: "",
    address_numero: "",
    address_complemento: "",
    address_cep: "",
    address_telefone: ""
  }

  constructor(public formBuilder: FormBuilder,
              private addressService: AddressService,
              private userService: UsersService,
              private snackBar: MatSnackBar,
              private router: Router) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      address_estado: ['', Validators.required],
      address_cidade: ['', Validators.required],
      address_bairro: ['', Validators.required],
      address_logradouro: ['', Validators.required],
      address_numero: ['', Validators.required],
      address_cep: ['', Validators.required],
      address_complemento: [''],
      address_nome: ['', Validators.required],
      address_sobrenome: ['', Validators.required],
      address_nascimento: ['', Validators.required],
      address_cpf: ['', Validators.required],
      address_email: ['', Validators.required],
      address_tel: ['', Validators.required],
      address_senha: ['', Validators.required],
      address_confirmarSenha: ['', Validators.required]
    });
  }

  validarSenha() {
    if (this.registerForm.controls['address_senha'].value == this.registerForm.controls['address_confirmarSenha'].value) {
      return true;
    } else {
      return false;
    }
  }

  save() {
    if (this.validarSenha()) {
      if (this.registerForm.valid) {
        this.userService.createUser(this.request).subscribe(res => {
          this.response = res
          this.showMessage('Cadastrado com sucesso!')
          this.router.navigate(['/'])
        },
          error => console.log(error))
        this.showMessage('E-mail ou senha incorretos')
      } else {
        this.showMessage('Preencha todos os campos')
        Object.keys(this.registerForm.controls).forEach(campo => {
          console.log(campo)
        })
      }
    } else {
      this.showMessage('Os campos Senha e Confirmar Senha devem ser iguais')
    }
  }

  validarSenhas = (confirmarSenha: FormBuilder): ValidatorFn => {
    console.log(confirmarSenha); // imprimindo o valor da confirmação de senha
    if (this.registerForm) {
      console.log(this.registerForm.get('senha').value); // imprimindo o valor da senha
    }
    return null;
  }

  consultaCEP(cep) {

    // Nova variável "cep" somente com dígitos.
    cep = cep.replace(/\D/g, '')

    if (cep != null && cep !== '') {
      this.addressService.consultaCEP(cep)
        .subscribe(dados => this.populaDadosForm(dados, this.registerForm))
    }

  }

  populaDadosForm(dados, formulario) {
    formulario.get('address_bairro').setValue(dados.bairro)
    formulario.get('address_complemento').setValue(dados.complemento)
    formulario.get('address_logradouro').setValue(dados.logradouro)
    formulario.get('address_cidade').setValue(dados.localidade)
    formulario.get('address_estado').setValue(dados.uf)
  }

  showMessage(msg: string, isErro: boolean = false): void {
    this.snackBar.open(msg, 'X', {
      duration: 4000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isErro ? ['msg-erro'] : ['msg-success']
    })
  }

}
