import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css'],
})
export class HeroSearchComponent implements OnInit {
  heroes$: Observable<Hero[]>;
  private searchTerms = new Subject<string>();

  constructor(private heroService: HeroService) {}

  ngOnInit(): void {
    this.heroes$ = this.searchTerms.pipe(
      // 击键后，等待300毫秒再往下执行，此时重新击键则重新计算 这个技术称为："防抖"
      debounceTime(300),

      // 确保只在过滤条件变化时才发送请求
      distinctUntilChanged(),

      // 每次变化项时，切换到新获取的数据
      switchMap((term: string) => this.heroService.searchHeroes(term))
    );
  }

  search(heroName: string): void {
    return this.searchTerms.next(heroName);
  }
}
