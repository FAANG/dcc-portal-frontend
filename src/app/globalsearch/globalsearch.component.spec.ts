import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { of } from 'rxjs';

import { GlobalSearchComponent } from './globalsearch.component';
import { ApiDataService } from '../services/api-data.service';

describe('GlobalSearchComponent', () => {
  let component: GlobalSearchComponent;
  let router: jasmine.SpyObj<Router>;
  let dataService: jasmine.SpyObj<ApiDataService>;

  beforeEach(() => {
    router = jasmine.createSpyObj<Router>('Router', ['navigate']);
    dataService = jasmine.createSpyObj<ApiDataService>('ApiDataService', ['getGSearchData']);
    const route = { queryParams: of({}) } as unknown as ActivatedRoute;
    const title = jasmine.createSpyObj<Title>('Title', ['setTitle']);

    // platformId 'server' keeps isBrowser false so ngOnInit does not register window listeners.
    component = new GlobalSearchComponent(dataService, router, route, title, 'server' as unknown as object);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('normalizeIndexKey', () => {
    it('strips a timestamped index date prefix', () => {
      expect(GlobalSearchComponent.normalizeIndexKey('2026_03_26_organism')).toEqual('organism');
      expect(GlobalSearchComponent.normalizeIndexKey('2026_03_26_specimen')).toEqual('specimen');
    });

    it('leaves keys without a date prefix unchanged', () => {
      expect(GlobalSearchComponent.normalizeIndexKey('protocol/samples')).toEqual('protocol/samples');
      expect(GlobalSearchComponent.normalizeIndexKey('analysis')).toEqual('analysis');
    });
  });

  describe('search result keys', () => {
    it('normalizes timestamped index names returned by the backend', () => {
      jasmine.clock().install();
      dataService.getGSearchData.and.returnValue(of({
        '2026_03_26_organism': { totalHits: 1, searchTerms: [] },
        '2026_03_26_specimen': { totalHits: 1, searchTerms: [] },
        'protocol/samples': { totalHits: 1, searchTerms: [] },
      } as any));

      component.searchText = 'SAMEA9835666';
      component.onSearch(0);
      jasmine.clock().tick(1);
      jasmine.clock().uninstall();

      expect(Object.keys(component.jsonData).sort()).toEqual(['organism', 'protocol/samples', 'specimen']);
    });
  });

  describe('navigateToItem', () => {
    beforeEach(() => {
      component.searchText = 'SAMEA9835666';
    });

    it('navigates to the clean entity route with the search term and that entity default sort', () => {
      component.navigateToItem('organism');

      expect(router.navigate).toHaveBeenCalledWith(
        ['/organism'],
        jasmine.objectContaining({
          queryParams: { searchTerm: 'SAMEA9835666', sortTerm: 'id_number', sortDirection: 'desc' }
        })
      );
    });

    it('does not 404 on a timestamped key — never routes to the raw index name', () => {
      component.navigateToItem('specimen');

      const route = (router.navigate.calls.mostRecent().args[0] as string[])[0];
      expect(route).toEqual('/specimen');
    });

    it('navigates to protocol routes without sort params', () => {
      component.navigateToItem('protocol/samples');

      expect(router.navigate).toHaveBeenCalledWith(
        ['/protocol/samples'],
        jasmine.objectContaining({ queryParams: { searchTerm: 'SAMEA9835666' } })
      );
    });

    it('uses an explicit search term when provided', () => {
      component.navigateToItem('organism', 'PROTO123');

      expect(router.navigate).toHaveBeenCalledWith(
        ['/organism'],
        jasmine.objectContaining({
          queryParams: { searchTerm: 'PROTO123', sortTerm: 'id_number', sortDirection: 'desc' }
        })
      );
    });
  });
});
