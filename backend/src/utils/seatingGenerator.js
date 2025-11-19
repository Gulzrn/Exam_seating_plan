const MAX_ATTEMPTS = 100;

const directions = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
  [-1, -1],
  [-1, 1],
  [1, -1],
  [1, 1],
];

const shuffleArray = (source) => {
  const arr = [...source];
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

const buildSeatPayload = (student) => {
  if (!student) {
    return { isEmpty: true, student: null };
  }

  return {
    isEmpty: false,
    student: {
      _id: student._id?.toString() || undefined,
      name: student.name,
      roll: student.roll,
      class: student.class,
    },
  };
};

const isSafe = (grid, row, col, candidate, rows, cols) => {
  if (!candidate || candidate.isEmpty) {
    return true;
  }

  for (const [dRow, dCol] of directions) {
    const newRow = row + dRow;
    const newCol = col + dCol;

    if (newRow < 0 || newCol < 0 || newRow >= rows || newCol >= cols) {
      continue;
    }

    const neighbor = grid[newRow][newCol];
    if (neighbor && !neighbor.isEmpty && neighbor.student.class === candidate.student.class) {
      return false;
    }
  }

  return true;
};

const generateSeatingPlan = (students, rows, cols) => {
  const seatCount = rows * cols;
  if (seatCount === 0) {
    return null;
  }

  const paddedStudents = [...students];
  const emptySeats = seatCount - students.length;

  for (let i = 0; i < emptySeats; i += 1) {
    paddedStudents.push(null);
  }

  for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt += 1) {
    const grid = Array.from({ length: rows }, () => Array(cols).fill(null));
    const shuffled = shuffleArray(paddedStudents);
    let seatIndex = 0;
    let failed = false;

    for (let r = 0; r < rows && !failed; r += 1) {
      for (let c = 0; c < cols; c += 1) {
        const student = shuffled[seatIndex];
        seatIndex += 1;

        const seatPayload = buildSeatPayload(student);

        if (!isSafe(grid, r, c, seatPayload, rows, cols)) {
          failed = true;
          break;
        }

        grid[r][c] = seatPayload;
      }
    }

    if (!failed) {
      return grid;
    }
  }

  return null;
};

module.exports = generateSeatingPlan;

