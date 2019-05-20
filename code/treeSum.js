/**
 * https://leetcode-cn.com/problems/3sum/
 * @param {number[]} nums
 * @return {number[][]}
 */

var threeSum = function(nums) {
    let l = 0
    let max = nums.length
    nums.sort((a, b) => a -b)
    console.log(nums)
    const res = []
    if (nums[l] > 0) {
        // do nothing
    } else {
        let n = null
        while ((n = nums[l]) <= 0) {
            let k = l
            while (nums[k + 1] === n) {
                k += 1
            }
            if (nums[k] === 0 && k - l > 1) {
                res.push([0, 0, 0]) 
                break
            }
            const pairs = findPairBySum(-n, nums, (k > l ? k : l + 1), max)
            console.log(l, k, pairs)
            pairs.forEach(p => res.push([n, ...p]))
            l = k + 1
        }
    }
    return res
};

function findPairBySum(expectedSum, nums, s, e) {
    let l = s
    let r = e - 1
    const pairs = []
    while (r > l) {
        const sum = nums[l] + nums[r]
        if (sum > expectedSum) {
            r --
        } else if (sum === expectedSum) {
            pairs.push([nums[l], nums[r]])
            while (nums[l] === nums[++l]) {}
            while (nums[r] === nums[--r]) {}
        } else {
            l ++
        }
    }
    return pairs
}

// const r = threeSum([-1,0,1,2,-1,-4])
// const r = threeSum([-2,0,0,2,2])
///[-4,-2,1,-5,-4,-4,4,-2,0,4,0,-2,3,1,-5,0]
// const r = threeSum([-4,-2,1,-5,-4,-4,4,-2,0,4,0,-2,3,1,-5,0])
const r = threeSum([0,0,0,0])
console.log(r)