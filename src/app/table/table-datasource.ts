import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

// TODO: Replace this with your own data model type
export interface TableItem {
  name: string;
  id: number;
  note: string;
  date: string;
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: TableItem[] = [
  {
    id: 1,
    name: 'Tadek',
    note: 'jhadsf oadsf jadsfk',
    date: new Date().toLocaleString().toLocaleString()
  },
  {
    id: 3,
    name: 'Długa',
    note: 'jhadsf oadsf jadsfk',
    date: new Date().toLocaleString()
  },
  {
    id: 2,
    name: 'Kółko',
    note: 'jhadsf oadsf jadsfk',
    date: new Date().toLocaleString()
  },
  {
    id: 4,
    name: 'Słupki',
    note: 'jhadsf oadsf jadsfk',
    date: new Date().toLocaleString()
  },
  {
    id: 5,
    name: 'Boron',
    note: 'jhadsf oadsf jadsfk',
    date: new Date().toLocaleString()
  },
  {
    id: 6,
    name: 'Carbon',
    note: 'jhadsf oadsf jadsfk',
    date: new Date().toLocaleString()
  },
  {
    id: 7,
    name: 'Nitrogen',
    note: 'jhadsf oadsf jadsfk',
    date: new Date().toLocaleString()
  },
  {
    id: 8,
    name: 'Oxygen',
    note: 'jhadsf oadsf jadsfk',
    date: new Date().toLocaleString()
  },
  {
    id: 9,
    name: 'Fluorine',
    note: 'jhadsf oadsf jadsfk',
    date: new Date().toLocaleString()
  },
  {
    id: 10,
    name: 'Neon',
    note: 'jhadsf oadsf jadsfk',
    date: new Date().toLocaleString()
  },
  {
    id: 11,
    name: 'Sodium',
    note: 'jhadsf oadsf jadsfk',
    date: new Date().toLocaleString()
  },
  {
    id: 12,
    name: 'Magnesium',
    note: 'jhadsf oadsf jadsfk',
    date: new Date().toLocaleString()
  },
  {
    id: 13,
    name: 'Aluminum',
    note: 'jhadsf oadsf jadsfk',
    date: new Date().toLocaleString()
  },
  {
    id: 14,
    name: 'Silicon',
    note: 'jhadsf oadsf jadsfk',
    date: new Date().toLocaleString()
  },
  {
    id: 15,
    name: 'Phosphorus',
    note: 'jhadsf oadsf jadsfk',
    date: new Date().toLocaleString()
  },
  {
    id: 16,
    name: 'Sulfur',
    note: 'jhadsf oadsf jadsfk',
    date: new Date().toLocaleString()
  },
  {
    id: 17,
    name: 'Chlorine',
    note: 'jhadsf oadsf jadsfk',
    date: new Date().toLocaleString()
  },
  {
    id: 18,
    name: 'Argon',
    note: 'jhadsf oadsf jadsfk',
    date: new Date().toLocaleString()
  },
  {
    id: 19,
    name: 'Potassium',
    note: 'jhadsf oadsf jadsfk',
    date: new Date().toLocaleString()
  },
  {
    id: 20,
    name: 'Calcium',
    note: 'jhadsf oadsf jadsfk',
    date: new Date().toLocaleString()
  }
];

/**
 * Data source for the Table view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class TableDataSource extends DataSource<TableItem> {
  data: TableItem[] = EXAMPLE_DATA;

  constructor(private paginator: MatPaginator, private sort: MatSort) {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<TableItem[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    // Set the paginator's length
    this.paginator.length = this.data.length;

    return merge(...dataMutations).pipe(
      map(() => {
        return this.getPagedData(this.getSortedData([...this.data]));
      })
    );
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: TableItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: TableItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'name':
          return compare(a.name, b.name, isAsc);
        case 'id':
          return compare(+a.id, +b.id, isAsc);
        default:
          return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
