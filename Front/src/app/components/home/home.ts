import { Component } from '@angular/core';
import { HeroSlider } from './hero-slider/hero-slider';
import { TrendingProducts } from './trending-products/trending-products';
import { LatestNews } from './latest-news/latest-news';
import { FeaturedCategories } from './featured-categories/featured-categories';

@Component({
  selector: 'app-home',
  imports: [HeroSlider, TrendingProducts, LatestNews, FeaturedCategories],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
