import { Injectable } from '@angular/core';
import { LoginRetornoDTO } from '../interfaces/login/login-retorno.interface';

@Injectable({
  providedIn: 'root'
})
export class GlobalServiceService {

  public user!: LoginRetornoDTO;
  constructor() { }
}
