import { Pipe, PipeTransform } from '@angular/core';
import { TreeNode } from 'primeng/api';

@Pipe({
    name: 'nodeFilter',
    pure: false
})
export class NodeFilterPipe implements PipeTransform {
    transform(items: TreeNode[], filter: string): any {
        if (!items || !filter) {
            return items;
        }
        // filter items array, items which match and return true will be
        // kept, false will be filtered out
        return items.filter(
            item => item.label.toLocaleLowerCase().indexOf(filter.toLocaleLowerCase()) !== -1);
    }
}