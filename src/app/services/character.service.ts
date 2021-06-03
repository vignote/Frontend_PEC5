import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Character, CharacterList } from '../models/character.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  DEFAULT_URL = 'https://swapi.dev/api/people/';
  constructor(public http: HttpClient) {}

  getCharacterList(inputUrl?: string) {
    const url = inputUrl ? inputUrl + '/' : this.DEFAULT_URL;
    console.log(url);
    return this.http.get<CharacterList>(url);
  }

  getCharacter(id: string) {
    const url = this.DEFAULT_URL + id + '/';
    console.log(url);
    return this.http.get<Character>(url);
  }
}
