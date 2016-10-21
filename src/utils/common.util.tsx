import { isEqual } from 'underscore';

export function RecursiveTree({ data, pid = null, parent_name = 'parent_id', current_name = 'id', child_name = 'childs' }) {
  const result = new Array();
  data.forEach(function (obj, iterator) {
    if (isEqual(obj[parent_name], pid)) {
      const childs = RecursiveTree({ data, pid: obj[current_name] });
      if (childs.length > 0) {
        obj[child_name] = childs;
      }
      result.push(obj);
    }
  });
  return result;
};

export default {
  RecursiveTree: RecursiveTree
};
