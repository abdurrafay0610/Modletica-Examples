




int function1(int n)
{
	while(true)
	{
		if(n == 1)
		{
			return n;
		}
		else if(n % 2 == 0)
		{
			n = n / 2;
		}
		else
		{
			n = ( 3 * n ) + 1;
		}
	}
}

int function2(int a, int b, int c)
{
	int result = fuction1(a) * function1(b);
	return result * function1(c);
}

int function3(int n)
{
	for( function2(n, n + 1, n - 1); function2(n -1, n, n+1); function2(n, n, n) )
	{
		n++;
	}
}