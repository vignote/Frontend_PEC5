import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { Character } from 'src/app/models/character.model';
import { CharacterService } from 'src/app/services/character.service';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.css'],
})
export class CharacterListComponent implements OnInit, OnDestroy {
  characters: Character[];
  previousPage: string = '';
  nextPage: string = '';
  characterSub: Subscription;
  constructor(
    private characterService: CharacterService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.getCharacterList();
  }

  ngOnDestroy() {
    if (this.characterSub) {
      this.characterSub.unsubscribe();
    }
  }

  getCharacterList(url?: string) {
    if (this.characterSub) {
      this.characterSub.unsubscribe();
    }
    this.characterSub = this.characterService
      .getCharacterList(url)
      .pipe(take(1))
      .subscribe((characterList) => {
        this.characters = characterList.results;
        this.previousPage = characterList.previous;
        this.nextPage = characterList.next;
      });
  }

  displayCharacter(url: string) {
    const id = url.slice(url.slice(0, -1).lastIndexOf('/') + 1, -1);
    this.route.navigate(['/character', id]);
  }
}
