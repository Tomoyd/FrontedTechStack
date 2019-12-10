cmake_minimum_required(VERSION 2.8.3)
project(clibs)

SET(CMAKE_BUILD_TYPE "Release")
## Compile as C++11
add_compile_options(-std=c++11) # failed to work on ubuntu 14.04 (TLS error)

## append external lib
list(APPEND CMAKE_MODULE_PATH "${PROJECT_SOURCE_DIR}/cmake")
##cannot find -lvtkproj4
#list(REMOVE_ITEM PCL_LIBRARIES vtkproj4)

## find PCL
find_package(PCL REQUIRED)
include_directories(${PCL_INCLUDE_DIRS})

## find Python
find_package(Python REQUIRED)
include_directories(${PYTHON_INCLUDE_DIRS})

## find Numpy
find_package(Numpy REQUIRED)
include_directories(${PYTHON_NUMPY_INCLUDE_DIR})

## find RSEncrypt
find_package(RSEncrypt REQUIRED)
include_directories(${RSENCRYPT_INCLUDE_DIR})

include_directories(include)

add_library(${PROJECT_NAME} SHARED
        include/pcl_process.h

        src/pcl_process.cpp
        src/pymodule.cpp
        )

set_target_properties(${PROJECT_NAME} PROPERTIES PREFIX "")

target_link_libraries(${PROJECT_NAME}
        boost_python ${BOOST_LIBRARIES} ${PYTHON_LIBARIES}
        ${PCL_LIBRARIES} ${RSENCRYPT_LIBRARY})

