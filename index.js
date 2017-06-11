let field_nodes = []
;[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].forEach((id) => {
  field_nodes.push(document.querySelector('#f-' + id))
})

let fields = [
  '-', '-', '-', '-',
  '-', '-', '-', '-',
  '-', '-', '-', '-',
  '-', '-', '-', '-'
]



document.addEventListener('keypress', (evt) => {
  let old_fields = [...fields]
  let new_fields
  switch (evt.code) {
    case 'KeyW':
      push_up()
      new_fields = fields
      spawn(old_fields, new_fields)
      break
    case 'KeyA':
      push_left()
      new_fields = fields
      spawn(old_fields, new_fields)
      break
    case 'KeyS':
      push_down()
      new_fields = fields
      spawn(old_fields, new_fields)
      break
    case 'KeyD':
      push_right()
      new_fields = fields
      spawn(old_fields, new_fields)
      break
  }
})

let set = () => {
  field_nodes.forEach((node, i) => {
    node.innerText = fields[i]
    node.className = fields[i] !== '-' ? 'a-' + fields[i] : 'a-empty'
  })
}

let gen = () => {
  fields[Math.floor(Math.random() * 16)] = Math.floor(Math.random() * 2) * 2 + 2
  set()
}

let spawn = (old_fields, new_fields) => {
  let different = false
  old_fields.forEach((field, i) => {
    if(old_fields[i] !== new_fields[i]) {
      different = true
    }
  })
  let c = []
  fields.forEach((field, i) => {
    if(field === '-') {
      c.push(i)
    }
  })
  if(different) fields[c[Math.floor(Math.random() * c.length)]] = Math.floor(Math.random() * 2) * 2 + 2
  set()
}

gen()
gen()
gen()

let push_left = () => {
  let rows = Array.rowSplit(fields, 4)
  rows.forEach((c, i) => {
    let row = rows[i]

    row = _push(row)
    c.forEach((f, x) => {
      row = _double(row, x)
    })
    row = _push(row)
  })
  fields = Array.rowConcat(rows)
  set()
}

let push_right = () => {
  let rows = Array.rowSplit([...fields].reverse(), 4)
  rows.forEach((c, i) => {
    let row = rows[i]

    row = _push(row)
    c.forEach((f, x) => {
      row = _double(row, x)
    })
    row = _push(row)
  })
  fields = Array.rowConcat(rows).reverse()
  set()
}

let push_up = () => {
  let columns = Array.colSplit(fields, 4)
  columns.forEach((c, i) => {
    let column = columns[i]
    column = _push(column)

    c.forEach((f, x) => {
      column = _double(column, x)
    })
    column = _push(column)
  })
  fields = Array.colConcat(columns)
  set()
}

let push_down = () => {
  let columns = Array.colSplit(fields.reverse(), 4)
  columns.forEach((c, i) => {
    let column = columns[i]
    column = _push(column)

    c.forEach((f, x) => {
      column = _double(column, x)
    })
    column = _push(column)
  })
  fields = Array.colConcat(columns).reverse()
  set()
}

let _push = (array) => {
  let l_empty = []
  array.forEach((item, i) => {
    if(item === '-') l_empty.push(i)
  })
  l_empty.forEach((item, i) => {
    array.splice(item-i, 1)
    array.push('-')
  })
  return array
}

let _double = (array, x) => {
  if(array[x] === array[x+1] && array[x] !== '-') {
    array[x] = array[x] * 2
    array[x+1] = '-'
  }
  return array
}

Array.rowSplit = (array, r_length) => {
  let l_array = []
  array.forEach((item, i) => {
    let row = Math.floor(i / Math.floor(array.length / r_length))
    l_array[row] = l_array[row] || []
    l_array[row].push(item)
  })
  return l_array
}

Array.colSplit = (array, r_length) => {
  let l_array = []
  array.forEach((item, i) => {
    let col = Math.floor(i % r_length)
    l_array[col] = l_array[col] || []
    l_array[col].push(item)
  })
  return l_array
}

Array.colConcat = (columns) => {
  let l_array = []
  columns.forEach((col, i) => {
    col.forEach((field, x) => {
      l_array[i + (x * columns.length)] = field
    })
  })
  return l_array
}

Array.rowConcat = (rows) => {
  let l_array = []
  rows.forEach((row, i) => {
    row.forEach((field, x) => {
      l_array[x + (i * rows.length)] = field
    })
  })
  return l_array
}

Array.shiftFrom = (array, start, end, amount, insert, condition) => {
  let l_beg = [...array].slice(0, start)
  let l_end = [...array].slice(end, array.length)
  let l_shift = [...array].slice(start, end)
  for(let i = 0;i < amount;i++){
    if(condition && condition(l_shift[i])) {
      l_shift.shift()
      l_shift.push(insert)
    } else if(condition === undefined){
      l_shift.shift()
      l_shift.push(insert)
    }
  }
  return [...l_beg, ...l_shift, ...l_end]
}
