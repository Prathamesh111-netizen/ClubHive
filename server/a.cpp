#include <bits/stdc++.h>

using namespace std;


signed main(int argc, char **argv)
{
    int n, k;
    cin >> n;
    vector<int> arr(n);
    for (int i = 0; i < n; i++)
        cin >> arr[i];
    cin >> k;
    // 4 5 9 5 6 7
    // 
    k %= n;
    vector<int> temp(n, 0);
    for (int i = 0; i + k < n; i++)
        temp[i] = arr[i + k];
    
    for (int i = k; i < n; i++)
        temp[i] = arr[i - k];
    
    reverse(temp.begin(), temp.end());
    for (int i = 0; i < n; i++)
        cout <<  arr[i];

    return 0;
}