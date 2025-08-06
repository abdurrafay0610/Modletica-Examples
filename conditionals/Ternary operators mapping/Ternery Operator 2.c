



bool function(int n)
{
	while(n!=1)
	{
		if(n%2 == 0)
		{
			n = n / 2;
		}
		else
		{
			n = (3*n) + 1;
		}
	}
	return true;
}

void ternery_operator_function1()
{
	int a = 1;
	int b = 2;
	int c = function()? function() * a: function() * b;
}