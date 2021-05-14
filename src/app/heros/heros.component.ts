import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { MessagesService } from '../messages.service';

@Component({
  selector: 'app-heros',
  templateUrl: './heros.component.html',
  styleUrls: ['./heros.component.css'],
})
export class HerosComponent implements OnInit {
  heroes: Hero[];

  constructor(private heroService: HeroService) {}

  ngOnInit(): void {
    this.getHeroes();
  }

  private getHeroes(): void {
    this.heroService.getHeroes().subscribe((heroes) => (this.heroes = heroes));
  }

  addHero(heroName: string): void {
    heroName = heroName.trim();
    if (!heroName) {
      return;
    }
    this.heroService
      .addHero({ name: heroName } as Hero)
      .subscribe((newHero) => this.heroes.push(newHero));
  }

  deleteHero(hero: Hero): void {
    if (hero) {
      this.heroService.deleteHero(hero).subscribe();
      this.heroes = this.heroes.filter((x) => x !== hero);
    }
  }
}
