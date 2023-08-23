---
author: Prince Addo
title: Union Find
description: A description and implementation of the Union Find data structure.
---

# Union Find

## Introduction

Union-find, also known as disjoint-set, is a graph data structure which is able to determine the set that an element belongs to, add an element to a set, or join two sets, in constant time(amortized).

## Representation

### Adjacency List

The union find data structure, like all graph data structure, can be represented using an adjacency list.

```cpp
vector<vector<int>> uf;
```

```py
uf = [[]];
```

In our case, and often in interview questions, the elements in the set are of type `int`, but they can of any type.

### Array

A more efficient representation can be achieved by using an array. The positions(index) of the array are the node values and the values at the indices are the parents of the node. For example lets say we have this array

```
  0   1   2   3   ...
-----------------
| 0 | 0 | 1 | 2 | ...
-----------------
```

node 0's parent is itself, node 1 parent is node 0, node 2's parent is node 1, node 3's parent is node 2, and so on. This is the representation I will be using for the implementation.

At initialization all indices are set to themselves

```
  0   1   2   3   ...
-----------------
| 0 | 1 | 2 | 3 | ...
-----------------
```

## Methods

The two main methods of the union-find data structure are union() and find(), hence the name.

### Find

The find method has the prototype `find(el)`, where `el` is the element who's set that they belong to you want to find (a set is any root node).

At its core, the find algorithm returns the value of the position `el` if the value is equal to `el`, or in other words, if the `el` node is the root. If it has a parent it will follow the ancestors until it finds the root.

For example, suppose we the union find array is currently

```
  0   1   2   3 
-----------------
| 0 | 0 | 1 | 2 |
-----------------
```

and you want to determine what set 3 belongs to. First we check if 3 is a root; it is not because its parent is 2. Then we go to 3's parent, 2, and check if it's a root; it is not its parent is 1. We check if 1 is a root, it is not its parent is 0. We check if 0's a root, and it is because it has no root. Therefore 3 belongs to the set 0. You can see that in this example there's only one set, 0, and all the nodes belong to it, including 0;

Here's the algorithm:
```cpp
int find(int el) {
    int it = el

    while(uf[it] != it) it = uf[it];

    return it;
}
```

```py
def find(el):
    it = el

    while(this.uf[it] != it) this.uf[it] = it

    return it
```

#### Path Compression

The algorithm above is not efficient because like the example above, a path to the root can become the entire array. To mitigate this the find algorithm implements a path compression routine, which follows the logic: once you find the root node of an element, set the parent of that element to the root node. 

Lets go back to the previous example
```
  0   1   2   3 
-----------------
| 0 | 0 | 1 | 2 |
-----------------
```
we found that the root of 3 (the set that 3 belongs to) is 0. we can update 3's parent to 0
```
  0   1   2   3 
-----------------
| 0 | 0 | 1 | 0 |
-----------------
```
now if we want to find the root of 3, it just takes 1 hop. That's path compression

Here's the algorithm:
```cpp
int find(int el) {
    int it = el

    while(uf[it] != it) it = uf[it];

    uf[el] = it;

    return it;
}
```

```py
def find(el):
    it = el

    while(this.uf[it] != it) this.uf[it] = it

    uf[el] = it

    return it
```

### Union

The find method has the prototype `union(a, b)`, where `a` is an element who's set you want to combine with the set of element `b`.

The algorithm essentially works by using the `find(el)` method to find the root nodes of `a` and `b`, and setting to root node of `b` to the root node of `a`.

For example, given this array
```
  0   1   2   3 
-----------------
| 1 | 1 | 2 | 2 |
-----------------
```

you can see that 0 belongs to set 1 and 3 belongs to set 2. Let say we call `union(0, 3)`. We find the root of 0: 1. Then we find the root of 3: 2. and we make 2 point to 1.
```
  0   1   2   3 
-----------------
| 1 | 1 | 1 | 2 |
-----------------
```
now they all belong in the same set, 1.

Here's the algorithm
```cpp
void union(int a, int b) {
    auto a_root = find(a);
    auto b_root = find(b);

    uf[b_root] = b_root;
}
```

```py
def union(a, b):
    a_root = find(a)
    b_root = find(b)

    this.uf[b_root] = a_root
```

## Use Cases

The union find algorithm generally useful when trying to query whether a directed graph has a cycle, which is often a sub-problem to more complex problems. It is also a key component in [Kruskal's algorithm](https://en.wikipedia.org/wiki/Kruskal%27s_algorithm).

## Implementation

*Node: this is just an example implementation, it should not be used for serious real world projects.*

```cpp
class UnionFind {
public:
    UnionFind(int size) {
        uf.resize(size);
    }

    int find(int el) {
        int it = el

        while(uf[it] != it) it = uf[it];

        uf[el] = it;

        return it;   
    }

    void union(int a, int b) {
        auto a_root = find(a);
        auto b_root = find(b);

        uf[b_root] = b_root;
    }

private:
    vector<int> uf;
}:
```

```py
class UnionFind:
    def __init__(size):
        this.uf = []  * size

    def union(a, b):
        a_root = find(a)
        b_root = find(b)

        this.uf[b_root] = a_root

    def find(el):
        it = el

        while(this.uf[it] != it) this.uf[it] = it

        uf[el] = it

        return it
```

