




void nested_loops()
{
	bool condition1 = true;

	for(int i=0;i<10;i++)
	{
		i++;
		while(condition1)
		{
			break;
			i--; // dead code
		}
		i++; // not dead code
	}
}