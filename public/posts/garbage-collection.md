# Intro

Garbage collection in Java (hanlded by Java Virtual Machine aka JVM) is often treated as a black box that somehow keeps memory usage in check. Understanding how JVM manages memory can be useful for diagnosing performance issues and optimizing applications. This post dives into the mechanics of Java garbage collection.

## What is Garbage Collection
Garbage Collection is the process of automatically identifying and reclaiming memory used by objects that are no longer reachable. This process helps avoid memory leaks and reduces the risk of `OutOfMemoryError`, allowing developers to focus less on manual memory management.

## Fundamentals of Memory Management
Java uses automatic memory management through its garbage collection (GC) system. Unlike languages like C or C++, devs don't explicitly allocate and free memory. Instead, the JVM handles memory allocation and reclamation, allowing devs to focus on business logic rather than worrying about memory management.

The Java heap is divided into several generations based on the empirical observation that most objects die young (the "generational hypothesis"):

- **Young Generation**: Where new objects are allocated
- **Old Generation (Tenured)**: Long-lived objects that have survived multiple collection cycles
- **Metaspace** (replaced PermGen in Java 8+): Stores class metadata

## Collection Algorithms

There are several garbage collection algorithms each with their own considerations such as:

### Serial Collector
 - A basic, single-threaded collector that stops all application threads during collection. Suitable for simple applications with small heaps on single-CPU machines.
 - Usage:- `-XX:+UseSerialGC`

### Parallel Collector
 - Uses multiple threads for collection, but still pauses application threads. This collector prioritizes throughput over latency, making it ideal for batch processing applications.
 - Usage:- `-XX:+UseParallelGC`

### Concurrent Mark Sweep (CMS)
 - Designed to minimize pause times by doing most of its work concurrently with the application. 
 - Note: This was deprecated in Java9 and is being phased out in favor of G1.

### G1 (Garbage First) Garbage Collector (G1GC)
 - The default collector since Java 9, G1 divides the heap into regions and prioritizes collecting regions with the most garbage. It aims to provide predictable pause times while maintaining good throughput.
 - Usage:- `-XX:+UseG1GC`

### ZGC (Z Garbage Collector)
 - Introduced in Java 11, ZGC is designed for very large heaps with low-latency requirements. It can handle heaps from a few gigabytes to multiple terabytes with pause times under 10ms.
 - Usage:- `-XX:+UseZGC`

### Shenandoah
 - Similar to ZGC in goals, Shenandoah aims to reduce GC pause times regardless of heap size.
 - Usage:- `-XX:+UseShenandoahGC`

## The Collection Process

Garbage collection generally follows these steps:

1. **Marking**: Identifying live objects by tracing references from "root" objects
2. **Sweeping/Copying**: Reclaiming memory from dead objects
3. **Compaction** (optional): Rearranging memory to reduce fragmentation

## Understanding G1GC

Since G1 (Garbage First) is now the default collector since Java 9, lets deep dive into how G1GC works

### Region-Based Memory Management
Unlike traditional collectors that separate the heap into contiguous young and old generations, G1 divides the entire heap into equal-sized regions (typically 1MB to 32MB each). These regions form a logical grid, and each region can dynamically serve as part of:

 - Eden space (for new allocations)
 - Survivor space (for young objects that survived a collection)
 - Old generation (for long-lived objects)
 - Humongous regions (for objects larger than 50% of a region size)

This flexible approach allows G1 to manage memory more efficiently and target specific regions for collection.

### How G1GC Works

G1 operates in several distinct phases:-

1. **Young-Only Collection Phase**:
   - Similar to traditional young generation collection but region-based
   - All application threads are paused (Stop-The-World)
   - Live objects in Eden regions are copied to Survivor regions or promoted to Old regions
   - This happens frequently and quickly, typically in milliseconds

2. **Concurrent Marking Phase**:
   - Triggered when the old generation occupancy reaches a threshold
   - Initial marking (brief STW pause): Identifies root objects and marks objects directly reachable from roots
   - Concurrent marking: Traverses the object graph from these roots while the application continues running
   - Remark (brief STW pause): Finalizes marking to account for changes made during concurrent marking
   - Cleanup (partially concurrent): Prepares for collection and identifies empty regions

3. **Mixed Collection Phase**:
   - Occurs after concurrent marking completes
   - Collects both young regions AND selected old regions with the highest garbage content
   - G1 selects old regions based on their "efficiency" (amount of garbage vs. collection time)
   - The number of old regions collected adapts to meet pause time goals

4. **Full GC (Fallback)**:
   - Only triggered if memory cannot be reclaimed quickly enough
   - Single-threaded, fully stop-the-world collection
   - Indicates suboptimal sizing or unexpected memory pressure


### G1GC's key innovations are:-

 - **Predictable Pause Times**: G1 strives to meet a user-defined pause time target (default 200ms) by adjusting how many regions it collects in each pause
 - **Garbage-First Approach**: It prioritizes collecting regions with the most garbage, maximizing reclamation efficiency
 - **Incremental Compaction**: Unlike CMS, G1 gradually compacts the heap during normal operations, reducing fragmentation
 - **Concurrency**: Much of G1's work happens concurrently with the application, reducing pause times
 - **Adaptive Sizing**: G1 automatically balances throughput and latency goals, learning from application behavior

## Tuning JVM params for Garbage Collection

While modern JVMs are well-tuned out of the box, the following parameters can help optimize GC:

```java
// Set the garbage collector
-XX:+UseG1GC  // Use G1 collector
-XX:+UseZGC   // Use Z collector

// Set heap sizes
-Xms4G -Xmx4G  // Initial and maximum heap size

// Set G1 pause time goal (in milliseconds)
-XX:MaxGCPauseMillis=200

// Tune region size (for G1)
-XX:G1HeapRegionSize=8M
```

## Monitoring GC

Understanding GC logs is essential for performance tuning. We can enable GC logging with below command:

```java
// Enable GC logging
-Xlog:gc*=info:file=gc.log:time,uptime,level,tags
```

Key metrics to monitor:

- Frequency of collections
- Duration of pause times
- Proportion of time spent in GC
- Memory usage patterns


## Conclusion

While modern JVMs handle memory management efficiently for most applications, understanding garbage collection principles allows developers to design more memory-efficient applications and diagnose performance issues effectively.