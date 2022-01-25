import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api/api.service';
import { years, courses } from './filter'
@Component({
  selector: 'app-alumni',
  templateUrl: './alumni.component.html',
  styleUrls: ['./alumni.component.scss']
})
export class AlumniComponent implements OnInit {
  page: number = 1;
  limit: number = 12;
  yearSearch: any = [];
  courseSearch: any = [];
  locationSearch: String | undefined;
  searchString: String | undefined;
  data: any = [];
  years: any;
  displayYearFilter: Boolean = false;
  displayCourseFilter: Boolean = false;
  displayLocationFilter: boolean = false;
  courses = courses();
  search: String = '';
  imageUrl = this.apiService.imageUrl;
  totalItems: any;
  constructor(
    private apiService: ApiService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.years = years();
    this.getDataFn();
  }

  getDataFn() {
    this.data = []
    let payload = {
      page: this.page,
      limit: this.limit,
      passingYear: this.yearSearch,
      branchOfStudy: this.courseSearch,
      locationSearch: this.locationSearch,
      name: this.searchString
    }
    this.apiService.postApiFn('/get-alumni', payload).subscribe((res: any) => {
      this.data = res.data;
      this.totalItems = res.totalCount
    })
  }

  pageChangeFn(page: number) {
    this.page = page;
    this.getDataFn();
  }
  searchFn(query: any, type: String) {
    if (type == 'yearSearch') {
      this.yearSearch.indexOf(query) === -1 ? this.yearSearch.push(query) : this.yearSearch.splice(this.yearSearch.indexOf(query), 1);
    }
    if (type == 'courseSearch') {
      this.courseSearch.indexOf(query) === -1 ? this.courseSearch.push(query) : this.courseSearch.splice(this.courseSearch.indexOf(query), 1);
    }
    if (type == 'searchInput') {
      if (query.length < 3) {
        this.toastr.error('Search character must be 3 digit long!!!')
        return;
      }
      this.searchString = query;
    }
    this.closeAllFilter();
    this.getDataFn();
  }

  clearFn() {
    this.closeAllFilter();
    this.page = 1;
    this.yearSearch = undefined;
    this.courseSearch = undefined;
    this.locationSearch = undefined;
    this.searchString = undefined;
    this.getDataFn();
  }

  closeAllFilter() {
    this.displayYearFilter = false;
    this.displayCourseFilter = false;
    this.displayLocationFilter = false;
  }

  openYearFilterFn() {
    this.displayYearFilter = !this.displayYearFilter;
  }
  openCourseFilterFn() {
    this.displayCourseFilter = !this.displayCourseFilter;
  }
  openLocationFilterFn() {
    this.displayLocationFilter = !this.displayLocationFilter;
  }
}
