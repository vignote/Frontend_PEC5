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
    const url = inputUrl ? inputUrl : this.DEFAULT_URL;
    return this.http.get<CharacterList>(url);
  }

  getCharacter(id: string) {
    return this.http.get<Character>(this.DEFAULT_URL + id);
  }
}
