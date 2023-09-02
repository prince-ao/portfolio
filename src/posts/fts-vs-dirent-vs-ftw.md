---
title: "fts vs dirent vs ftw"
layout: "@layouts/BlogPostLayout.astro"
author: "Prince Addo"
created: "2023-01-13T12:47:29-05:00"
updated: "2023-01-13T12:47:29-05:00"
description: "A comparison on the fts.h, dirent.h, and ftw.h libraries"
tags: ["linux-programming"]
---

fts.h, dirent.h and ftw.h are distinct libraries, but what they all have in common
is that they can be used to do the important job of traversing the Linux
directory tree. In this article, the pros and cons of using one of these
libraries over the other will be weighed so you can make a more informed decision
when choosing one of these libraries.

---

## ftw.h

### description

> ftw.h is a library that defines two key functions:

```c
#include <ftw.h>

int ftw(const char *dirpath,
	int (*fn) (const char *fpath, const struct *sb, int typeflag),
	int nopenfd
); // returns 0 on success, and -1 if an error occured.

int nftw(const char *dirpath,
	int (*fn) (const char *fpath, const struct stat *sb,
	int typeflag, struct FTW *ftwbuf),
	int nopenfd, int flags
); // returns 0 on success, and -1 if an error occured.
```

`ftw` was obsoleted by POSIX.1-2008, so we will not be discussing that function.
`nftw` is a function that walks through the entire directory tree, until the leaf,
using **pre-order traversal**(by default). The function takes in the path of the
where the function will start, `dirpath`, a function that matches the prototype,
`fn`, the number of file discriptors the function is allowed to have open at one
time, `nopenfd`, and optional flags, `flags`.

The user defined function input, `fn`, is what `nftw` will call every time it
reaches a new file in the directory tree. `fn` takes in as input a string
containing the path of the current file, fpath, a stat struct, `sb`,
flags, `typeflag`, and a FWT struct, `ftwbuf`. The stat struct is the same
that is returned by calling the `stat`function. It is defined as

```c
struct stat {
    dev_t     st_dev;     /* ID of device containing file */
    ino_t     st_ino;     /* inode number */
    mode_t    st_mode;    /* protection */
    nlink_t   st_nlink;   /* number of hard links */
    uid_t     st_uid;     /* user ID of owner */
    gid_t     st_gid;     /* group ID of owner */
    dev_t     st_rdev;    /* device ID (if special file) */
    off_t     st_size;    /* total size, in bytes */
    blksize_t st_blksize; /* blocksize for file system I/O */
    blkcnt_t  st_blocks;  /* number of 512B blocks allocated */
    time_t    st_atime;   /* time of last access */
    time_t    st_mtime;   /* time of last modification */
    time_t    st_ctime;   /* time of last status change */
};
```

`typeflag` could be any one of these values:

**FTW_F** := `fpath` is a regular file.

**FTW_D** | **FTW_DP** := `fpath` is a directory.

**FTW_SL** | **FTW_SLN** := `fpath` is a symbolic link.

**FTW_DNR** := `fpath` is a directory which cannot be read.

**FTW_NS** := The `stat` function call failed on `fpath`.

`ftwbuf` is a FTW struct defined as

```c
struct FTW {
    int base;
    int level;
};
```

where `base` is the offset of the filename in `fpath` and `level` is the depth of
`fpath` in the directory path, relative to the specified root, which has a level
of 0.

Two important `flags` that you should know about are

**FTW_DEPTH** := when set, the function changes the traversal from pre-order to a _post-order traversal_.

**FTW_PHYS** := when set, the function does not follow symbolic links when they are encountered.

For a more in-depth description of ftw.h read the
[man page](https://linux.die.net/man/3/ftw).

### example

This is an example of using `nftw` to count the number of directories in the current
path.

```c
#include <ftw.h>
#include <stdlib.h>
#include <stdio.h>
#include <string.h>

int directoryN = 0;

int directoryCounter(const char *fpath, const struct stat *sb,
		int typeflag, struct FTW *ftwbuf) {
	if((typeflag == FTW_D || typeflag == FTW_DP)
		&& !strcmp(fpath, ".")
		&& !strcmp(fpath, "..")) directoryN++;
	return 0;
}

int main(void){
	int flags = FTW_PHYS | FTW_DEPTH;

	if(nftw(".", directoryCounter, 20, flags) == -1) {
		perror("nftw");
		return 1;
	}

	printf("There are %u directories in the current directory\n", directoryN);

	return 0;
}
```

### pros

The biggest advantage of using `nftw` is its ease of use; with e simple function and a
couple of flags, you can have a Linux directory tree traverser up and running.
Another advantage is the simplicity. The `fn` function provides you with basically
all the detail about a particular file, so you can easily use that information to
make a decision. **Overall, the ftw library allows you to easily develop a simple program
that traverses Linux directory tree.**

### cons

The `nftw`, and especially the `ftw`, function is **too simple for a more complex program**.
For example, if you want to create a abstract representation of the Linux directory tree
in memory it will be, at least, non-trivial and probably impossible. This is because the
`nftw` function abstracts away the traversal and only offers a linear representation of
the it.

## dirent.h

### description

The key functions for dirent.h are:

```c
#include <sys/types.h>
#include <dirent.h>

DIR *opendir(const char *name); // returns NULL if an error occurs and sets errno

DIR *fdopendir(int fd); // returns NULL if an error occurs and sets errno

struct dirent *readdir(DIR *dirp); // returns NULL if an error occurs and sets errno

int readdir_r(DIR *dirp, struct dirent *entry, struct dirent **result); // returns 0 on success and a positive error number if an error occurs

void seekdir(DIR *dirp, long offset);

long telldir(DIR *dirp); // returns -1 on if an error occurs and sets errno

int closedir(DIR *dirp); // returns 0 on success. On error, returns -1 and sets errno
```

The dirent library follows the familiar open, read, close pattern that is used in read
only files and the functions also match such purposes. `opendir` and `fdopendir` both
open a new `DIR`, they use the path of the root folder and the file file descriptor or
the directory, respectively. `DIR` is the central component of the dirent library.
Similar to `FILE`, you can read it by passing it to a function, but unlike `FILE` you
cannot write directly to it.

Both the `readdir` and `readdir_r` function read `DIR`;
the `readdir` function returns a dirent structure while the `readdir_r` takes in an
existing dirent structure, `entry`, and another dirent structure, `result` and stores
the current directory entry in `entry` and the next one in `result`.

Finally, `seekdir` and `telldir` are used to deposition `DIR` and `closedir` is used to
close it.

The dirent structure, the most important structure in the dirent structure, is described as

```c
struct dirent {
    ino_t          d_ino;       /* inode number */
    off_t          d_off;       /* offset to the next dirent */
    unsigned short d_reclen;    /* length of this record */
    unsigned char  d_type;      /* type of file; not supported
                                   by all file system types */
    char           d_name[256]; /* filename */
};
```

For a more in-depth description of dirent.h read the [source code](https://github.com/tronkko/dirent/blob/master/include/dirent.h).

### example

Another implementation of the number of directories in the current path.

```c
#include <stdlib.h>
#include <stdio.h>
#include <sys/types.h>
#include <dirent.h>

int directoryN = 0;

void directoryCounter(DIR *root, const char *root_path) {
	struct dirent *p;
	while((p = readdir(root)) != NULL){
		if(!strcmp(p->d_name, ".") && !strcmp(p->d_name, "..")) continue;

		if(p->d_type == DT_DIR){
			directoryN++;
			char *full_path = (char *)malloc(strlen(root_path) + strlen(p->d_name) + 1);
			strcpy(full_path, root_path);
			strcat(full_path, p->d_name);
			strcat(full_path, "/");

			DIR *curr;
			if((curr = opendir(full_path)) == NULL){
				perror("");
				exit(1);
			}

			directroyCounter(curr, full_path);

		}
	}
}

int main(void) {
	DIR *curr;
	const char *root_path = "./";
	if((curr = opendir(root_path)) == NULL){
		perror("");
		exit(1);
	}

	directoryCounter(curr, root_path);

	printf("There are %u directories in the current directory\n", directoryN);

	return 0;
}
```

### pros

dirent.h gives you more control over the method in which you execute the program. This
means that you can tailor the code to do what you need it to do and possibly achieve
a faster running time because of that. It also allows you to create more complex algorithm
by giving you the choice to go up or down the tree at any moment.

### cons

The increased flexibility leads to increased complexity. Not only will you have to
execute several functions provided by dirent.h, but you will also have to use other
functions from other libraries(or even worst, make your own) to create a complete program.
This is due partly because the lack of information in the dirent structure.

## fts.h

### description

The key functions in fts.h are:

```c
FTS *fts_open(char * const *path_argv, int options,
              int (*compar)(const FTSENT **, const FTSENT **));

FTSENT *fts_read(FTS *ftsp);

int fts_close(FTS *ftsp);
```

The `fts` library has similar interfaces as `dirent.h`. `fts_open` create a new `FTS`
which is analogous to `DIR`. `fts_read` reads the directory in preorder(by default)
or postorder depending on the `option` you gave to the `fts_open` function.

The `FTSENT` structure is what stores all the major information about a particular file.
The structure is described as:

```c
typedef struct _ftsent {
    unsigned short fts_info;     /* flags for FTSENT structure */
    char          *fts_accpath;  /* access path */
    char          *fts_path;     /* root path */
    short          fts_pathlen;  /* strlen(fts_path) */
    char          *fts_name;     /* filename */
    short          fts_namelen;  /* strlen(fts_name) */
    short          fts_level;    /* depth (-1 to N) */
    int            fts_errno;    /* file errno */
    long           fts_number;   /* local numeric value */
    void          *fts_pointer;  /* local address value */
    struct ftsent *fts_parent;   /* parent directory */
    struct ftsent *fts_link;     /* next file structure */
    struct ftsent *fts_cycle;    /* cycle structure */
    struct stat   *fts_statp;    /* stat(2) information */
} FTSENT;
```

For more information on `fts.h` check out the [man page](https://linux.die.net/man/3/fts)

### example

Yet another implementation of the number of directories in the current path.

```c
#include <fts.h>
#include <stdio.h>
#include <sys/stat.h>

int directoryN = 0;

int main(void){
	FTS *op;
	FTSENT *curr;
	char *root_path = {"./", NULL };

	if((op = fts_open(root_path, FTS_NOCHDIR | FTS_PHYSICAL | FTS_XDEV, NULL)) == NULL){
		perror("");
		exit(1);
	}

	while((curr = fts_read(op)) != NULL){
		if(S_ISDIR(curr->fts_statp->mode)){
			directoryN++;
		}
	}

	printf("There are %u directories in the current directory\n", directoryN);

	return 0;
}
```

### pros

`fts.h` allows you to create directory tree traversal quickly and `FTSENT` provides you
with a lot of useful information about the current file.

### cons

The library is relatively obscure and at times hard to understand. It also suffers from
the same problem as `ftw.h`, namely, it is difficult to build more complex applications;
but my intuition tell me that `fts.h` allows more complexity than `ftw.h` because you're
looping while you read.

## Conclusion

After examining and experimenting with the various libraries, the choice between `fts.h`,
`dirent.h` and `ftw.h` depends on you're particular application and its complexity. For
example, if you're building a `ls(1)` clone, than either `ftw.h` or `fts.h` would be a
great choice because that command doesn't require any complicated traversal or to create
a another structure. If I were to list the libraries by order of how complex they allow
you to build you're application, it would be: `dirent.h`, `fts.h`, `ftw.h`; with `dirent.h`
allowing you to build the most complex applications.

So, if you're deciding which library to use, first think about how complex you're
application will be and how much control of the directory tree traversal you want,
and then make your choice. And if you want complete control, you can go as low as
using the `read` and `getdents` system calls.
