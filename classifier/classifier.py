#!/usr/bin/env python

import numpy as np
from PIL import Image
import sys

Theta1 = np.loadtxt('Theta1.txt')
Theta2 = np.loadtxt('Theta2.txt')

def sigmoid(z):
    return 1 / (1 + np.exp(-z))

def classify(x):
    h1 = sigmoid(Theta1 * np.vstack((np.ones((1, 1)), x)))
    h2 = sigmoid(Theta2 * np.vstack((np.ones((1, 1)), h1)))
    return h2

def main():
    image = Image.open(sys.stdin).resize((20, 20), resample=Image.ANTIALIAS).convert('F')
    x = (1 - np.matrix(image) / 255).reshape((-1, 1), order='F')
    result = classify(x)
    for p, d in sorted(((result[(d - 1) % 10, 0], d) for d in range(10)), reverse=True):
        sys.stdout.write('{}: {:.3f}\n'.format(d, p))

if __name__ == '__main__':
    main()
