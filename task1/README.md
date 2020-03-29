# NodeJS Caesar Cipher Task!

CLI tool accepts 4 options (short alias and full name):
1.  **-s, --shift**: a shift
2.  **-i, --input**: an input file
3.  **-o, --output**: an output file
4.  **-a, --action**: an action encode/decode

## Usage example

Two files ***input.txt*** and ***output.txt*** are included for comfortable testing.
Preparation:
> $ cd ./task1

> $ npm install

Testing:
>$ node cli --action encode --shift 7 --input ./path/input.txt --output ./path/output.txt

>$ node cli --a encode --s 7 --i ./path/input.txt --o ./path/output.txt

>$ node cli --a encode --s 7

>$ node cli --a encode --s 7 --i ./path/input.txt

>$ node cli --a encode --s 7 --o ./path/output.txt