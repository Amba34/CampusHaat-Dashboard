import { Question } from "./type";

export const questionBank: Question[] = [
  {
    id: "q1",
    title: "Two Sum Indices",
    description: "Find the indices of the two numbers in an array that add up to a specific target.",
    difficulty: "Easy",
    code: `function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const diff = target - nums[i];
    if (map.has(diff)) {
      return [map.get(diff), i];
    }
    map.set(nums[i], i);
  }
  return [];
}`,
    tags: ["Array", "Hash Map"],
    howtosolve: "Use a hash map to store the complement of each number and check if it exists while iterating."
  },
  {
    id: "q2",
    title: "Add Two Numbers (Linked List)",
    description: "Add two numbers represented by linked lists and return the sum as a linked list.",
    difficulty: "Medium",
    code: `function addTwoNumbers(l1, l2) {
  let dummy = new ListNode(0);
  let curr = dummy;
  let carry = 0;

  while (l1 || l2 || carry) {
    let sum = (l1?.val || 0) + (l2?.val || 0) + carry;
    carry = Math.floor(sum / 10);
    curr.next = new ListNode(sum % 10);
    curr = curr.next;
    l1 = l1?.next;
    l2 = l2?.next;
  }
  return dummy.next;
}`,
    tags: ["Linked List", "Math"],
    howtosolve: "Simulate digit-by-digit addition while maintaining carry and use a dummy node to track the result."
  },
  {
    id: "q3",
    title: "Median of Two Sorted Arrays",
    description: "Find the median of two sorted arrays.",
    difficulty: "Hard",
    code: `function findMedianSortedArrays(nums1, nums2) {
  const merge = [...nums1, ...nums2].sort((a, b) => a - b);
  const mid = Math.floor(merge.length / 2);
  return merge.length % 2 === 0
    ? (merge[mid - 1] + merge[mid]) / 2
    : merge[mid];
}`,
    tags: ["Array", "Binary Search", "Divide and Conquer"],
    howtosolve: "Use a binary search approach for optimal performance or merge and find the median directly."
  },
  {
    id: "q4",
    title: "Balanced Parentheses",
    description: "Check if the given parentheses string is balanced.",
    difficulty: "Easy",
    code: `function isValid(s) {
  const stack = [];
  const map = {
    '(': ')',
    '[': ']',
    '{': '}'
  };
  for (let ch of s) {
    if (map[ch]) {
      stack.push(map[ch]);
    } else {
      if (stack.pop() !== ch) return false;
    }
  }
  return stack.length === 0;
}`,
    tags: ["Stack", "String"],
    howtosolve: "Use a stack to track opening parentheses and match them as closing ones come in."
  },
  {
    id: "q5",
    title: "Longest Palindromic Substring",
    description: "Find the longest palindromic substring in a given string.",
    difficulty: "Medium",
    code: `function longestPalindrome(s) {
  let res = '';
  for (let i = 0; i < s.length; i++) {
    const expand = (l, r) => {
      while (l >= 0 && r < s.length && s[l] === s[r]) {
        l--; r++;
      }
      return s.slice(l + 1, r);
    };
    const odd = expand(i, i);
    const even = expand(i, i + 1);
    if (odd.length > res.length) res = odd;
    if (even.length > res.length) res = even;
  }
  return res;
}`,
    tags: ["String", "Dynamic Programming"],
    howtosolve: "Use center expansion technique to find palindromes centered at each index."
  },
  {
    id: "q6",
    title: "N-Queens Solver",
    description: "Place N queens on an N×N chessboard so that no two queens attack each other.",
    difficulty: "Hard",
    code: `function solveNQueens(n) {
  const res = [];
  const board = Array(n).fill().map(() => Array(n).fill('.'));

  const isValid = (row, col) => {
    for (let i = 0; i < row; i++) {
      if (board[i][col] === 'Q') return false;
      if (col - (row - i) >= 0 && board[i][col - (row - i)] === 'Q') return false;
      if (col + (row - i) < n && board[i][col + (row - i)] === 'Q') return false;
    }
    return true;
  };

  const dfs = (row) => {
    if (row === n) {
      res.push(board.map(row => row.join('')));
      return;
    }
    for (let col = 0; col < n; col++) {
      if (isValid(row, col)) {
        board[row][col] = 'Q';
        dfs(row + 1);
        board[row][col] = '.';
      }
    }
  };

  dfs(0);
  return res;
}`,
    tags: ["Backtracking"],
    howtosolve: "Use backtracking and validate queen placements using row and diagonal checks."
  },
  {
    id: "q7",
    title: "Valid Palindrome",
    description: "Check if a string is a valid palindrome, ignoring non-alphanumeric characters.",
    difficulty: "Easy",
    code: `function isPalindrome(s) {
  s = s.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
  return s === s.split('').reverse().join('');
}`,
    tags: ["String", "Two Pointers"],
    howtosolve: "Clean the string and use two pointers or string reversal to verify."
  },
  {
    id: "q8",
    title: "String to Integer (Atoi)",
    description: "Convert a string to an integer following rules similar to the Atoi function.",
    difficulty: "Medium",
    code: `function myAtoi(s) {
  s = s.trim();
  const match = s.match(/^([+-]?\\d+)/);
  const num = match ? parseInt(match[0], 10) : 0;
  return Math.max(Math.min(num, 2**31 - 1), -(2**31));
}`,
    tags: ["String", "Math"],
    howtosolve: "Use regex or manual parsing to read characters and ensure constraints."
  },
  {
    id: "q9",
    title: "Merge Sorted Linked Lists",
    description: "Merge two sorted linked lists into one sorted list.",
    difficulty: "Medium",
    code: `function mergeTwoLists(l1, l2) {
  if (!l1) return l2;
  if (!l2) return l1;
  if (l1.val < l2.val) {
    l1.next = mergeTwoLists(l1.next, l2);
    return l1;
  } else {
    l2.next = mergeTwoLists(l1, l2.next);
    return l2;
  }
}`,
    tags: ["Linked List", "Recursion"],
    howtosolve: "Use recursion or iteration to build a new list by comparing node values."
  },
  {
    id: "q10",
    title: "Maximum Depth of Binary Tree",
    description: "Find the maximum depth (height) of a binary tree.",
    difficulty: "Easy",
    code: `function maxDepth(root) {
  if (!root) return 0;
  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}`,
    tags: ["Tree", "DFS"],
    howtosolve: "Use recursion to traverse each branch and return the longest path."
  }
];

