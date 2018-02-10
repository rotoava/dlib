
## 编译和使用支持 arm64, armv7 机构的 dlib 静态库。

```
cd dlib/examples    
修改 CMakeLists.txt 注释掉 52 和 55 行（静态库中，不需要这个例子文件cpp）     
mkdir build      
cd build      
cmake .. -G Xcode   
```   
//build 目录下会生成 xcode 工程，设置 xcode 工程来编译目标库      
打开 examples.xcodeproj      
选中 target dlib     
Build Settings -> Supported Platforms 设置为 iOS ，默认为 Mac    
Build Settings -> Base SDK 设置为 iOS 11     
Build Settings -> Build Active Architecture Only 设置为 NO，生成 fat 静态库      

选中 Project -> info iOS Deployment Target 设置为 10.     
选中 tool bar -> product ->  scheme -> edit  scheme -> Run -> info -> Build Config 设置为 release        

点击编译 

```
编译结果 7.3 MB
Architectures in the fat file: ../build/dlib_build/Release-iphoneos/libdlib.a are: armv7 arm64 
```







 






==================================================================
# dlib C++ library [![Travis Status](https://travis-ci.org/davisking/dlib.svg?branch=master)](https://travis-ci.org/davisking/dlib)

Dlib is a modern C++ toolkit containing machine learning algorithms and tools for creating complex software in C++ to solve real world problems. See [http://dlib.net](http://dlib.net) for the main project documentation and API reference.



## Compiling dlib C++ example programs

Go into the examples folder and type:

```bash
mkdir build; cd build; cmake .. ; cmake --build .
```

That will build all the examples.
If you have a CPU that supports AVX instructions then turn them on like this:

```bash
mkdir build; cd build; cmake .. -DUSE_AVX_INSTRUCTIONS=1; cmake --build .
```

Doing so will make some things run faster.

Finally, Visual Studio users should usually do everything in 64bit mode.  By default Visual Studio is 32bit, both in its outputs and its own execution, so you have to explicitly tell it to use 64bits.  Since it's not the 1990s anymore you probably want to use 64bits.  Do that with a cmake invocation like this:
```bash
cmake .. -G "Visual Studio 14 2015 Win64" -T host=x64 
```

## Compiling your own C++ programs that use dlib

The examples folder has a [CMake tutorial](https://github.com/davisking/dlib/blob/master/examples/CMakeLists.txt) that tells you what to do.  There are also additional instructions on the [dlib web site](http://dlib.net/compile.html).

## Compiling dlib Python API

Before you can run the Python example programs you must compile dlib. Type:

```bash
python setup.py install
```

or type

```bash
python setup.py install --yes USE_AVX_INSTRUCTIONS
```

if you have a CPU that supports AVX instructions, since this makes some things run faster.  



## Running the unit test suite

Type the following to compile and run the dlib unit test suite:

```bash
cd dlib/test
mkdir build
cd build
cmake ..
cmake --build . --config Release
./dtest --runall
```

Note that on windows your compiler might put the test executable in a subfolder called `Release`. If that's the case then you have to go to that folder before running the test.

This library is licensed under the Boost Software License, which can be found in [dlib/LICENSE.txt](https://github.com/davisking/dlib/blob/master/dlib/LICENSE.txt).  The long and short of the license is that you can use dlib however you like, even in closed source commercial software.

## dlib sponsors

This research is based in part upon work supported by the Office of the Director of National Intelligence (ODNI), Intelligence Advanced Research Projects Activity (IARPA) under contract number 2014-14071600010. The views and conclusions contained herein are those of the authors and should not be interpreted as necessarily representing the official policies or endorsements, either expressed or implied, of ODNI, IARPA, or the U.S. Government.

